import React, { useState } from "react";
import Sidebar from "./Sidebar";
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

export default function Header() {
  const { user, logout } = useAuth();

  // const user = useSelector(selectUser);
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  async function handleLogOut(e) {
    e.preventDefault();

    try {
      // setError("");
      // setLoading(true);
      logout();
      navigate("/");
    } catch (err) {
      // setError("Failed to log out");
      console.log(err);
    }
    // setLoading(false);
  }

  return (
    <div className="flex justify-between hero-container">
      <div className="flex items-center gap-1 md:gap-2">
        <button
          className="hover:opacity-95 my-auto ml-2 w-[40px] h-[40px] text-emerald-50 text-2xl"
          onClick={() => setShowMenu(true)}
        >
          &#x2630;
        </button>
        <NavLink to="/">
          <h2 className="text-shadow text-emerald-50 md:text-[2rem] tracking-wider">
            Recipe App
          </h2>
        </NavLink>
      </div>
      {/* Sidebar */}
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} user={user} />

      {/* Header buttons */}
      <div className="flex flex-wrap">
        {!user && (
          <NavLink
            className="bg-emerald-400 hover:bg-emerald-400/90 shadow-md my-auto mr-2 px-2 py-1 border border-white rounded-full w-fit h-fit text-slate-50 text-sm text-center active:active:scale-[98%]"
            to={"/login"}
          >
            <div>Sign In</div>
          </NavLink>
        )}
        {user && (
          <div className="flex flex-wrap justify-end items-center gap-4">
            <button
              className="bg-red-500/80 hover:bg-red-500/100 shadow-md mr-4 px-2 py-1 border border-white rounded-full w-fit min-w-[80px] h-fit text-white text-center active:scale-[98%]"
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
