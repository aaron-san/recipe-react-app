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
    <div className="mx-auto max-w-[90%]">
      {error && <div>Error !!</div>}
      {isLoading && <div className="h-[280px]">Loading ...</div>}
      {recipes && (
        <div className="flex gap-2 shadow-md border-2 border-emerald-400 border-opacity-80 rounded-xl w-90 overflow-x-scroll snap-x no-wrap no-scrollbar">
          {recipes?.map((recipe) => {
            return (
              <Link
                to={"/recipe/" + recipe.id}
                key={recipe.id}
                className="snap-center"
              >
                <img
                  className="shadow-md min-w-[200px] h-[200px]"
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
