import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import facebook from "next-auth/providers/facebook";
import google from "next-auth/providers/google";
import { encrypt } from "./lib/lib.ts";
import { userModel } from "./models/user-model";
import { replaceMongoIdInObject } from "./utils/data-utils.js";
import connectMongo from "./services/mongo.js";

const authConfig = {
  providers: [
    google,
    facebook,
    credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await connectMongo();
        try {
          const user = await userModel
            .findOne({ email: credentials.email })
            .lean();
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return replaceMongoIdInObject(user);
            } else {
              throw new Error("Email or password mismatch");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile, trigger, session }) {
      if (account) {
        if (account.provider === "credentials") {
          // Save the access token and refresh token in the JWT on the initial login
          const accessToken = await encrypt({ user, expires: "10d" });
          const refreshToken = await encrypt({ user, expires: "1m" });

          const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Access token

          return {
            user,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            provider: account.provider,
          };
        } else {
          return {
            user: {
              ...user,
              id: token.sub,
            },
            provider: account.provider,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          };
        }
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return token;
    },
  },
};

async function refreshGoogleToken(token) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID,
        client_secret: process.env.AUTH_GOOGLE_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });

    const tokens = await response.json();

    if (!response.ok) throw tokens;

    return {
      ...token,
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing Google access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export default authConfig;
