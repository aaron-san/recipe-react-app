import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import recipes from "../data/recipes.json";

function Searched() {
  let params = useParams();

  const searchedRecipes = recipes.recipes.filter((recipe) =>
    recipe.title.toLowerCase().match(params.search.toLowerCase())
  );
  return (
    <>
      {/* <h1>{params.search}</h1> */}
      {/* <h4>{titles}</h4> */}
      <h3>Searched</h3>
      <Grid>
        {searchedRecipes.map((recipe) => {
          return (
            <Card key={recipe.id}>
              <img src={"../assets/images/" + recipe.image} alt="" />
              <h2>{recipe.title}</h2>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  align-items: end;
  justify-items: center;
`;

const Card = styled.div`
img {
    width: 200px;
    border-radius: 2rem;
}
a {
    text-decoration; none;
}
h2 {
    text-align: center;
    padding: 1rem;
    margin: 0.5rem;
}
`;

export default Searched;
