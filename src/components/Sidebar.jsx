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
import { dispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const menuVariants = {
  open: {
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
          className="top-0 left-0 z-50 absolute flex flex-col gap-4 bg-emerald-600 h-screen text-slate-100"
          variants={menuVariants}
          // initial={{ width: showMenu ? "0px" : "600px" }}
          animate={showMenu ? "open" : "close"}
        >
          <div className="flex flex-col items-start gap-2 mt-16 ml-2 text-xl">
            <NavLink
              className="flex gap-2 p-2 active:font-bold text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline"
              to={"/cuisine/desserts"}
              onClick={() => setShowMenu(false)}
            >
              <GiPieSlice />
              <span>Desserts</span>
            </NavLink>
            <NavLink
              className="flex gap-2 p-2 active:font-bold text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline"
              to={"/cuisine/healthy"}
              onClick={() => setShowMenu(false)}
            >
              <GiBodyBalance />
              <span>Healthy</span>
            </NavLink>
            <NavLink
              className="flex gap-2 p-2 active:font-bold text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline"
              to={"/cuisine/main-dishes"}
              onClick={() => setShowMenu(false)}
            >
              <GiChickenOven />
              <span>Main dishes</span>
            </NavLink>
            <NavLink
              className="flex gap-2 p-2 active:font-bold text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline"
              to={"/cuisine/side-dishes"}
              onClick={() => setShowMenu(false)}
            >
              <GiRiceCooker />
              <span>Side dishes</span>
            </NavLink>
          </div>
          <button
            className="top-2 right-2 absolute hover:bg-slate-500 mx-auto rounded-full w-[40px] h-[40px]"
            onClick={() => setShowMenu(false)}
          >
            X
          </button>
          {user && (
            <div className="self-center p-2 border border-white rounded-md text-white"></div>
          )}
        </motion.section>
      )}
    </div>
  );
}
