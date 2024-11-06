import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
// import { updateSession } from "./lib/lib.ts";

let locales = ["bn", "en"];
let defaultLocale = "en";

function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  // updateSession(request);
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const locale = getLocale(request);
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `${locale}`
  );
  const allCookies = request.cookies.getAll();
  const isLoggedIn = allCookies[2]?.value;
  if (isLoggedIn) {
  }
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}?${searchParams.toString()}`, request.url)
    );
  }
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-params`
  response.headers.set(
    "x-params",
    JSON.stringify(extractParamsFromURL(pathname))
  );
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

function extractParamsFromURL(url) {
  const params = {};
  const queryString = url.split("/");
  if (queryString) {
    params["lang"] = queryString[1];
    params["id"] = queryString[queryString.length - 1];
  }
  return params;
}
