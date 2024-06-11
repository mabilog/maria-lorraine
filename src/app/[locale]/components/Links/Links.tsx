"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { queryNavlinks, Navlink } from "../../services";
import { Link } from "@/navigation";

const Links = () => {
  const { locale }: { locale: string } = useParams();
  const [navlinks, setNavlinks] = useState<Navlink[]>([]);

  useEffect(() => {
    getNavlinksData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("navlinks", navlinks);
  }, [navlinks]);

  const getNavlinksData = async () => {
    try {
      const res: Navlink[] = await queryNavlinks(locale);
      setNavlinks(res);
    } catch (error) {
      console.error("Failed to fetch navlinks", error);
    }
  };

  return (
    <>
      {navlinks ? (
        <ul>
          {navlinks.map((link) => (
            <li key={link.id}>
              <Link href={link.slug}> {link.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>nothing to see here</>
      )}
    </>
  );
};

export default Links;
