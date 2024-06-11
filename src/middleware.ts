import { locales, localePrefix } from "./navigation";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Used when no locale matches
  defaultLocale: "en",
  // A list of all locales that are supported
  locales,
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*"],
};
