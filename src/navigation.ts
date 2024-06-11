import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "fr"];
export const localePrefix = "always";

export const pathnames = {
  "/": "/",
  "/projects": "/projects",
  "/contact": "/contact",
};

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
