import { Link } from "react-router-dom";

import {
  useFetchRecipesQuery,
  // useAddRecipeMutation,
} from "../features/recipes/recipesApi";
// const [addRecipe, { isLoading }] = useAddRecipeMutation();

// import { motion } from "framer-motion";

function Popular() {
  const { data: recipes, error, isLoading } = useFetchRecipesQuery();

  return (
    <div className="mx-auto">
      <h2 className="categoryTitle">Popular Picks</h2>
      {error && <div>Error !!</div>}
      {isLoading && <div>Loading ...</div>}
      {recipes && (
        <div className="w-[800px] flex gap-2 overflow-x-scroll no-wrap no-scrollbar border-8 border-yellow-500 border-opacity-80 rounded-md">
          {recipes?.map((recipe) => {
            return (
              <Link to={"/recipe/" + recipe.id} key={recipe.id} className="">
                <img
                  className="h-[200px] border border-orange-30 min-w-[200px] shadow-md"
                  src={"assets/images/" + recipe.image}
                  alt={recipe.title}
                  // key={recipe.id}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Popular;
