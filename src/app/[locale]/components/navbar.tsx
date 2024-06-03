"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type NavLink = {
  id: string;
  title: string;
  slug: string;
};

async function getNavLinks(): Promise<NavLink[]> {
  const HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Navlink {
        navlinks {
          id
          title
          slug
        }
      }`,
    }),
  });
  const json = await response.json();
  return json.data.navlinks;
}

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const links = await getNavLinks();
      setNavLinks(links);
    };

    fetchData();
  }, []);

  return (
    <nav className="w-full flex justify-between items-center h-32">
      <div className="logo">
        <Link href="/">
          <p className="text-2xl font-bold">
            Next<span className="text-blue-500">Intl</span>
          </p>
        </Link>
      </div>
      <ul className="flex space-x-10">
        {navlinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.slug}
              className={
                isActive(link.slug)
                  ? "underline decoration-blue-500 decoration-4"
                  : ""
              }
            >
              {t(link.title)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex space-x-10">
        <Link href={pathname} locale="en">
          🏴󠁧󠁢󠁥󠁮󠁧󠁿 {t("english")}
        </Link>
        <Link href={pathname} locale="fr">
          🇫🇷 {t("french")}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
