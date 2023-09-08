// import recipes from "../data/recipes.json";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { motion } from "framer-motion";

function Popular() {
  // const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.value);

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
        {recipes.map((recipe) => {
          return (
            <Link to={"/recipe/" + recipe.id} key={recipe.id}>
              <img
                className="recipe-card"
                src={"assets/images/" + recipe.image}
                alt={recipe.title}
                // key={recipe.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
