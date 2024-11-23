"use server";
import { signIn } from "@/auth";
import connectMongo from "@/services/mongo";

export async function login(formData) {
  console.log(formData);
  try {
    await connectMongo();
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
