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
    <List>
      <StyledLink to={"/"}>
        <GiHomeGarage />
        <span>Home</span>
      </StyledLink>
      <StyledLink to={"/cuisine/desserts"}>
        <GiPieSlice />
        <span>Desserts</span>
      </StyledLink>
      <StyledLink to={"/cuisine/healthy"}>
        <GiBodyBalance />
        <span>Healthy</span>
      </StyledLink>
      <StyledLink to={"/cuisine/main-dishes"}>
        <GiChickenOven />
        <span>Main Dishes</span>
      </StyledLink>
      <StyledLink to={"/cuisine/side-dishes"}>
        <GiRiceCooker />
        <span>Side Dishes</span>
      </StyledLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 1.2rem;
  margin-bottom: 1.6rem;

  @media (max-width: 600px) {
    padding: 0;
    margin: 10px 0;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column; // place icon above text
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  border: 1px solid #pink;
  box-shadow: 3px 3px 10px 3px rgba(140, 140, 140, 0.5);
  padding: 5px 5px;
  text-align: center;
  width: 210px;
  margin: 5px 15px;
  // margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, white, pink);
  font-size: 1.4rem;

  @media (max-width: 800px) {
    width: 30%;
    font-size: 1.2rem;
    padding: 5px 15px;
    border-radius: 25px;

    span {
      font-size: 14px;
    }
    svg {
      font-size: 3rem;
    }
    font-size: 1.2rem;
  }
`;
