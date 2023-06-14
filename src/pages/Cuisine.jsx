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
    <Grid>
      {filteredRecipes.map((item) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={item.id}
          >
            <Card>
              <Link to={"/recipe/" + item.id}>
                <h3>{item.title}</h3>
                <img src={"../assets/images/" + item.image} alt={item.title} />
              </Link>
            </Card>
          </motion.div>
        );
      })}
    </Grid>
  );
}

export default Cuisine;

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); */
  grid-template-columns: fit-content(40%);
  grid-gap: 1rem;
  justify-items: center;
  margin: 5px 100px;
  // align-items: center;
  @media (max-width: 640px) {
    grid-gap: 1rem;
  }
`;

const Card = styled.div`
  text-align: center;
  h3 {
    margin: 5px;
    font-size: 1.4rem;
    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  }
  img {
    background: white;
    border-radius: 10px;
    box-shadow: 3px 3px 5px lightgray;
    padding: 10px;
    /* max-width: 300px; */
    /* max-height: 300px; */
    height: 180px;
    width: auto;
    /* height: auto; */
    @media (max-width: 640px) {
      max-width: 200px;
      max-height: 200px;
    }
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
