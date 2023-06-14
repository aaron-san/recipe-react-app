import {
  GiPieSlice,
  GiRiceCooker,
  GiBodyBalance,
  GiChickenOven,
  GiHomeGarage,
} from "react-icons/gi";
import { NavLink } from "react-router-dom";

import React from "react";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="nav-list">
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
    </div>
  );
}
