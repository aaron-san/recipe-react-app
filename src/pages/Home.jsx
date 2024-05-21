import React, { useState } from "react";
import Popular from "../components/Popular";
// import Search from "../components/Search";
import { motion } from "framer-motion";
import HeaderText from "../components/HeaderText";
import Form from "../components/Form";
// import { useParams } from "react-router-dom";
// import { db } from "./config/firestore";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  // const [recipes, setRecipes] = useState([]);

  // const recipes = useSelector((state) => state.recipes.value);

  return (
    <div className="home-container">
      <motion.div
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <Search /> */}
        {/* <Button variant="contained">Hello World</Button> */}
        {/* <Hero /> */}
        <HeaderText />
        <Popular />
        <Form />
        {/* <Recipe /> */}
      </motion.div>
    </div>
  );
}

export default Home;
