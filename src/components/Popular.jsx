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
    <div>
      <Wrapper>
        <h2 className="categoryTitle">Popular Picks</h2>
        <div>
          {recipes.recipes.map((recipe) => {
            return recipe.id;
            //       <SplideSlide key={recipe.id}>
            //         <motion.Card
            //           initial={{ opacity: 0 }}
            //           animate={{ opacity: 1 }}
            //           exit={{ opacity: 0 }}
            //         >
            //           <StyledLink to={"/recipe/" + recipe.id}>
            //             <div>{recipe.title}</div>
            //             <img
            //               src={"assets/images/" + recipe.image}
            //               alt={recipe.title}
            //             />
            //           </StyledLink>
            // </motion.Card>
          })}
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  svg {
    margin: 5px;
  }

  // height: auto;
  width: auto;
  background-image: linear-gradient(35deg, lightblue, white);
  border: 10px white solid;
  border-radius: 2rem;

  .categoryTitle {
    font-size: 2rem;
    margin-left: 15px;
    color: #313131;
  }

  h2 {
    margin: 5px;
    text-decoration: underline white;
  }
`;

const Card = styled.div`
  border-radius: 2rem;
  // width: 300px;
  height: 300px;
  width: auto;
  position: relative;
  text-align: center;
  margin: 0;
  display: flex;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items; flex-end;
  margin: 40px 0;
  max-width: 310px;
  
  img {
    z-index: -1;
    background: linear-gradient(45deg, #ef806e, #efc86f);
    border-radius: 10px;
    box-shadow: 3px 3px 5px lightgray;
    padding: 3px 10px;
    // max-width: 300px;
    max-height: 240px;
    width: auto;
    height: auto;
  }
  div {
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    bottom: 48px; //19px
    text-decoration: none;
    margin-bottom: 2px;
    padding: 0 30px;
    width: 241px;
    height: 120px;
    z-index: 15;
    color: white;
    font-size: 2rem;
    text-decoration: none;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(80, 0, 60, 0.5));
  }

  @media (max-width: 640px) {
    img {
      padding: 3px 5px;
      max-width: 150px;
      max-height: 180px;
    }
    div {
      position: absolute;
    bottom: 19px;
    margin-bottom: 2px;
    padding: 0 25px;
    width: 99px;
    height: 90px;
    z-index: 15;
    font-size: 1.3rem;
    }

  }
`;

export default Popular;
