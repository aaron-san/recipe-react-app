import React from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import recipes from "../data/recipes.json";
import { motion } from "framer-motion";

const cleanedRecipes = recipes.recipes.filter((item) => item.id);

function Cuisine() {
  let params = useParams();

  const filteredRecipes = cleanedRecipes.filter((item) =>
    item.tag.split(";").includes(params.type)
  );

  return (
    <div className="recipe-card-container">
      {filteredRecipes.map((item) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={item.id}
            className="recipe-card"
          >
            <Link className="recipe-card-link" to={"/recipe/" + item.id}>
              <h3>{item.title}</h3>
              <img
                className="recipe-card-img"
                src={"../assets/images/" + item.image}
                alt={item.title}
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Cuisine;
