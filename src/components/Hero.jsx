import React, { useState } from "react";
import {
  GiPieSlice,
  GiRiceCooker,
  GiBodyBalance,
  GiChickenOven,
  GiHomeGarage,
} from "react-icons/gi";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../contexts/AuthContext";

const menuVariants = {
  open: {
    width: "100vw",
  },
  close: {
    width: ["600px", "450px", "0px"],
    transition: {
      delay: 1,
    },
  },
};

export default function Hero() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { logout } = useAuth();
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  async function handleLogOut(e) {
    e.preventDefault();

    try {
      // setError("");
      // setLoading(true);
      await logout();
      navigate("/");
    } catch (err) {
      // setError("Failed to log out");
      console.log(err);
    }
    // setLoading(false);
  }

  return (
    <div className="flex justify-between hero-container">
      <button
        // className="p-2 m-2 text-2xl text-white border border-white rounded-full"
        className="w-[40px] h-[40px] border rounded-full border-slate-100 hover:bg-slate-400 text-slate-100 ml-4"
        onClick={() => setShowMenu(true)}
      >
        &#x2630;
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.section
            className="absolute h-[1200px] bg-slate-600 text-slate-100 top-0 flex flex-col gap-4 z-50"
            variants={menuVariants}
            initial={{ width: showMenu ? "0px" : "600px" }}
            animate={showMenu ? "open" : "close"}
          >
            <div className="flex flex-col items-center gap-2 mt-8 text-2xl">
              <NavLink className="flex gap-2 p-2 text-slate-100" to={"/"}>
                <GiHomeGarage />
                <span>Home</span>
              </NavLink>
              <NavLink
                className="flex gap-2 p-2 text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline active:font-bold"
                to={"/cuisine/desserts"}
              >
                <GiPieSlice />
                <span>Desserts</span>
              </NavLink>
              <NavLink
                className="flex gap-2 p-2 text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline active:font-bold"
                to={"/cuisine/healthy"}
              >
                <GiBodyBalance />
                <span>Healthy</span>
              </NavLink>
              <NavLink
                className="flex gap-2 p-2 text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline active:font-bold"
                to={"/cuisine/main-dishes"}
              >
                <GiChickenOven />
                <span>Main Dishes</span>
              </NavLink>
              <NavLink
                className="flex gap-2 p-2 text-slate-100 hover:text-blue-500 active:text-slate-400 active:underline active:font-bold"
                to={"/cuisine/side-dishes"}
              >
                <GiRiceCooker />
                <span>Side Dishes</span>
              </NavLink>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="w-[40px] h-[40px] mx-auto border rounded-full border-slate-100 hover:bg-slate-400 absolute top-4 right-4"
            >
              &#x2630;
            </button>
            <div className="self-center p-2 text-white border border-white rounded-md">
              {user.email}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <div className="flex flex-wrap">
        {!user && (
          <NavLink
            className="text-white border border-white shadow-md bg-green-500/80 hover:bg-green-500/90 active:translate-y-1 p-2 rounded-lg h-fit w-fit min-w-[80px] text-center"
            to={"/login"}
          >
            <div>Log In</div>
          </NavLink>
        )}
        {user && (
          <div className="flex flex-wrap items-center justify-end gap-4">
            <button
              className="text-white border border-white shadow-md bg-red-500/80 hover:bg-red-500/100 active:translate-y-1 p-2 rounded-lg h-fit w-fit min-w-[80px] text-center mr-4"
              onClick={handleLogOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
