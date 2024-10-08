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
    <div className="mx-4">
      <h2 className="categoryTitle">Popular Picks</h2>
      {error && <div>Error !!</div>}
      {isLoading && <div>Loading ...</div>}
      {recipes && (
        <div className="w-90 md:w-[800px] flex gap-2 overflow-x-scroll no-wrap no-scrollbar border-8  border-yellow-500 border-opacity-80 rounded-md snap-x">
          {recipes?.map((recipe) => {
            return (
              <Link
                to={"/recipe/" + recipe.id}
                key={recipe.id}
                className="snap-center"
              >
                <img
                  className="h-[260px] border border-orange-300 min-w-[300px] shadow-md"
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
