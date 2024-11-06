import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import facebook from "next-auth/providers/facebook";
import google from "next-auth/providers/google";

import { replaceMongoIdInObject } from "./utils/data-utils.js";
import connectMongo from "./services/mongo.js";
import { User } from "./app/models/user-model.js";

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
          const user = await User.findOne({ email: credentials.email }).lean();
          if (user) {
            // const isMatch = await bcrypt.compare(
            //   credentials.password,
            //   user.password
            // );
            if (true) {
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
          return {
            user,
            token,
            account,
            profile,
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

export default authConfig;
