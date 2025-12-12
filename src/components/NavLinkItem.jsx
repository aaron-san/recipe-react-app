import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const NavLinkItem = ({ to, children, setShowMenu }) => {
  return (
    <NavLink
      className="flex gap-2 p-2 active:font-bold text-amber-900 hover:text-amber-700 active:text-slate-400 active:underline"
      to={to}
      onClick={() => setShowMenu(false)}
    >{children}</NavLink>
  );
};

export default NavLinkItem;
