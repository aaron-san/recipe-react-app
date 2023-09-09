import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Cuisine = () => {
  let params = useParams();
  //   const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.value);

  console.log(recipes);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.tag.includes(params.type)
  );

  return (
    <div>
      <h1>Cuisine</h1>
      {filteredRecipes.map((recipe) => {
        return <div>{recipe.title}</div>;
      })}
    </div>
  );
};

export default Cuisine;
