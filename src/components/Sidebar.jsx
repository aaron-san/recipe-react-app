import React, { useState } from "react";
import {
  GiPieSlice,
  GiRiceCooker,
  GiBodyBalance,
  GiChickenOven,
  GiHomeGarage,
} from "react-icons/gi";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { auth, logout } from "../config/firebase";
// import { logout, selectUser } from "../features/auth/authSlice";
// import { dispatch, useSelector } from "react-redux";
import NavLinkItem from "./NavLinkItem";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const menuVariants = {
  open: {
    // width: parseInt(window.innerWidth) < 700 ? "100vw" : "25vw",
    width: parseInt(window.innerWidth) < 700 ? "100vw" : "25vw",
  },
  close: {
    width: ["600px", "450px", "0px"],
    transition: {
      delay: 1,
    },
  },
};

export default function Sidebar({ showMenu, setShowMenu, user }) {
  return (
    <div>
      {showMenu && (
        <motion.section
          className="top-0 left-0 z-50 absolute flex flex-col items-center md:items-start gap-4 bg-amber-200 border-amber-900 border-r h-screen text-amber-900"
          variants={menuVariants}
          // initial={{ width: showMenu ? "0px" : "600px" }}
          animate={showMenu ? "open" : "close"}
        >
          <div className="flex flex-col items-start gap-2 mt-16 ml-2 text-xl">
            <NavLinkItem to={"/cuisine/main-dishes"} setShowMenu={setShowMenu}>
              <GiChickenOven />
              <span>Main dishes</span>
            </NavLinkItem>
            <NavLinkItem to={"/cuisine/side-dishes"} setShowMenu={setShowMenu}>
              <GiRiceCooker />
              <span>Side dishes</span>
            </NavLinkItem>
            <NavLinkItem to={"/cuisine/desserts"} setShowMenu={setShowMenu}>
              <GiPieSlice />
              <span>Desserts</span>
            </NavLinkItem>
            <NavLinkItem to={"/cuisine/healthy"} setShowMenu={setShowMenu}>
              <GiBodyBalance />
              <span>Healthy</span>
            </NavLinkItem>
          </div>
          <button
            className="top-2 right-2 absolute hover:bg-slate-500 mx-auto rounded-full w-[40px] h-[40px]"
            onClick={() => setShowMenu(false)}
          >
            X
          </button>
          {/* {user && (
            <div className="self-center p-2 border border-white rounded-md text-white"></div>
          )} */}
        </motion.section>
      )}
    </div>
  );
}
