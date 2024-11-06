import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import React from "react";
import { getDictionary } from "../dictionary";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
// metadata
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}
export const metadata = {
  title: "Login",
};
export default async function LoginPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const session = await auth();
  if (session) {
    return redirect(`/${lang}/account`);
  }
  return (
    <>
      {/* login */}
      <div className="contain py-16 ">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            {dictionary.login}
          </h2>

          <LoginForm dictionary={dictionary} lang={lang} />

          {/* login with */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              {dictionary.or_login_with}
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
          </div>

          {/* ./login with */}
          <SocialLogin dictionary={dictionary} />

          <p className="mt-4 text-center text-gray-600">
            {dictionary?.dont_have_account}{" "}
            <Link href={`/${lang}/register`} className="text-primary">
              {dictionary?.register_now}
            </Link>
          </p>
        </div>
      </div>
      {/* ./login */}
    </>
  );
}
