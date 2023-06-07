import {
  GiPieSlice,
  GiRiceCooker,
  GiBodyBalance,
  GiChickenOven,
  GiHomeGarage,
} from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import React from "react";

export default function Category() {
  return (
    <div className="nav-list">
      <NavLink className="navlink" to={"/"}>
        <GiHomeGarage />
        <span>Home</span>
      </NavLink>
      <NavLink className="navlink" to={"/cuisine/desserts"}>
        <GiPieSlice />
        <span>Desserts</span>
      </NavLink>
      <NavLink className="navlink" to={"/cuisine/healthy"}>
        <GiBodyBalance />
        <span>Healthy</span>
      </NavLink>
      <NavLink className="navlink" to={"/cuisine/main-dishes"}>
        <GiChickenOven />
        <span>Main Dishes</span>
      </NavLink>
      <NavLink className="navlink" to={"/cuisine/side-dishes"}>
        <GiRiceCooker />
        <span>Side Dishes</span>
      </NavLink>
    </div>
  );
}
