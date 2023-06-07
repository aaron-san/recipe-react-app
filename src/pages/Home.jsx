import Popular from "../components/Popular";
import Cuisine from "./Cuisine";
import React from "react";
// import Search from "../components/Search";
import Button from "@mui/material/Button";
// import AppBar from "../components/AppBar";
import Recipe from "./Recipe";
import { motion } from "framer-motion";
import styled from "styled-components";
import HeaderText from "../components/HeaderText";

function Home() {
  return (
    <Container>
      <motion.div
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <Search /> */}
        {/* <Button variant="contained">Hello World</Button> */}
        <HeaderText />
        <Popular />
        <Cuisine />
        {/* <Recipe /> */}
      </motion.div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  margin: 0 100px;

  @media (max-width: 640px) {
    margin: 0 10px;
  }
`;
