// import { useEffect, useState } from "react";
// import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import styled from "styled-components";
import recipes from "../data/recipes.json";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// recipes.recipes.map((img) => {
//   console.log(img);
// });

function Popular() {
  //   const [popular, setPopular] = useState([]);

  //   useEffect(() => {
  //     getPopular();
  //   }, []);

  //   console.log(recipes);
  // async ensures that we wait for the data before rendering anything else
  //   const getPopular = async () => {
  // const api = await fetch('https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}');
  // const data = await api.json();
  // setPopular(data.recipes);
  //   setPopular(recipes);
  //   };

  return (
    <div className="popular-container">
      {/* <h2 className="categoryTitle">Popular Picks</h2> */}
      <div className="recipe-card-container">
        {recipes.recipes.map((recipe) => {
          return (
            <Link to={"/recipe/" + recipe.id} key={recipe.id}>
              <img
                className="recipe-card"
                src={"assets/images/" + recipe.image}
                alt={recipe.title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
