"use client";
import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useParams } from "next/navigation";

const Localization = () => {
  const pathname = usePathname();
  const { locale } = useParams();

  return (
    <div>
      {locale === "en" ? (
        <Link href={pathname} locale="fr">
          🇫🇷 Français
        </Link>
      ) : (
        <Link href={pathname} locale="en">
          🏴󠁧󠁢󠁥󠁮󠁧󠁿 English
        </Link>
      )}
    </div>
  );
};

export default Localization;
