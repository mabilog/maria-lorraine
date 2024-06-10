"use client";
import { useState, useEffect } from "react";
import { queryNavlinks } from "../../services";

type Navlink = {
  id: string;
  title: string;
  slug: string;
};

const Navbar = () => {
  const [navlinks, setNavlinks] = useState([]);

  useEffect(() => {
    getNavlinksData();
  }, []);

  const getNavlinksData = async () => {
    const res = await queryNavlinks();
    setNavlinks(res.navlinks);
    return;
  };

  return <div>Navbar</div>;
};

export default Navbar;
