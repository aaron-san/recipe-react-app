import React from "react";
import {
  GiPieSlice,
  GiRiceCooker,
  GiBodyBalance,
  GiChickenOven,
  GiHomeGarage,
} from "react-icons/gi";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { logout } = useAuth();
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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
      <div className="flex gap-2">
        <NavLink className="nav-link" to={"/"}>
          <GiHomeGarage />
          <span>Home</span>
        </NavLink>
        <NavLink className="nav-link" to={"/cuisine/desserts"}>
          <GiPieSlice />
          <span>Desserts</span>
        </NavLink>
        <NavLink className="nav-link" to={"/cuisine/healthy"}>
          <GiBodyBalance />
          <span>Healthy</span>
        </NavLink>
        <NavLink className="nav-link" to={"/cuisine/main-dishes"}>
          <GiChickenOven />
          <span>Main Dishes</span>
        </NavLink>
        <NavLink className="nav-link" to={"/cuisine/side-dishes"}>
          <GiRiceCooker />
          <span>Side Dishes</span>
        </NavLink>
      </div>
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
            <div className="self-center p-2 text-white border border-white rounded-md">
              {user.email}
            </div>
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
