import { useState } from "react";
// import { addRecipeRedux } from "../features/recipes/slices/recipesSlice";
// Authentication
// import { getAuth } from "firebase/auth";
// import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useAddRecipeMutation } from "../features/recipes/recipesApi";

const FormRecipe = ({ addRecipe, setAddRecipe, addNote }) => {
  const [addNewRecipe, { isLoading }] = useAddRecipeMutation();
  const { user } = useAuth();

  // "id": "chickenTenders",
  // "title": "Chicken Tenders",
  // "tag": "main-dishes; chicken",
  // "ingredients": "soy souce; garlic; ginger; salt and pepper",
  // "instructions": "Mix all raw ingredients; Dip in beaten egg batter; Cover in bread crumbs; Bake for 15 minutes at 400°F.",
  // "image": "tomatoSoup.png"

  const initRecipeInput = {
    title: "",
    tags: [],
    ingredients: [],
    instructions: [],
    imageUrl: "",
  };
  const [recipeInput, setRecipeInput] = useState(initRecipeInput);

  const handleAddRecipe = async (e) => {
    // Prevent server submission
    e.preventDefault();

    const newRecipe = {
      title: recipeInput.title,
      tags: recipeInput.tags.map((tag) => tag.trim().toLowerCase()),
      ingredients: formatStringToArray(recipeInput.ingredients),
      instructions: formatStringToArray(recipeInput.instructions),
      image: recipeInput.imageUrl,
    };
    console.log("newRecipe", newRecipe);
    try {
      await addNewRecipe({ newRecipe }).unwrap();
      setRecipeInput(initRecipeInput);
      setAddRecipe(false);
      // show success or reset form
    } catch (err) {
      console.error("Failed to add recipe:", err);
    }

    // await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);
  };

  function formatStringToArray(str) {
    if (typeof str !== "string") return [];
    return str
      .split(";")
      .map((el) => el.trim())
      .filter((el) => el !== "");
  }

  return (
    <div className="flex justify-center gap-4">
      {!addRecipe && !addNote && (
        <button
          className="bg-emerald-400 hover:bg-emerald-400/90 shadow-md my-4 px-4 py-1 border border-slate-800 rounded text-slate-800 active-translate-y-[1px]"
          onClick={() => setAddRecipe(!addRecipe)}
        >
          Add Recipe
        </button>
      )}
      {addRecipe && !user && (
        <div className="flex justify-center mt-16 h-screen">
          <div className="text-center">
            <p>
              Please{" "}
              <Link to="/login" className="text-blue-500 underline">
                Sign in
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Register
              </Link>{" "}
              <br />
              <br />
              to add a recipe.
            </p>
          </div>
        </div>
      )}

      {addRecipe && user && (
        <form
          onSubmit={handleAddRecipe}
          className="flex justify-center p-5 border border-gray-300 font-bold"
        >
          <h1 className="self-center my-2 text-red-700 text-3xl underline uppercase">
            Add Recipe
          </h1>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              className="text-md"
              autoFocus
              required
              value={recipeInput.title}
              placeholder="Title..."
              onChange={(e) =>
                setRecipeInput({ ...recipeInput, title: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="tags">Tags:</label>
            <select
              name="tags"
              className="mr-2 ml-2 h-12 overflow-none text-md"
              value={recipeInput.tags}
              onChange={(e) => {
                const options = [...e.target.selectedOptions];
                const values = options.map((option) => option.value);
                setRecipeInput({ ...recipeInput, tags: values });
              }}
              multiple={true}
            >
              <option value="main-dishes">Main Dish</option>
              <option value="side-dishes">Side Dish</option>
              <option value="side-dishes">Condiment</option>
              <option value="side-dishes">Dessert</option>
            </select>
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="ingredients">Ingredients: </label>
            <input
              type="text"
              name="ingredients"
              className="text-md"
              required
              value={recipeInput.ingredients}
              placeholder="rice; potatoes; ..."
              // onChange={(e) => setIngredients(e.target.value)}
              onChange={(e) =>
                setRecipeInput({ ...recipeInput, ingredients: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="instructions">Instructions: </label>
            <textarea
              type="text"
              name="instructions"
              className="m-2 p-2 border border-blue-600 w-[226px] text-md"
              required
              value={recipeInput.instructions}
              placeholder="[instruction1; instruction2; ...]"
              onChange={(e) =>
                setRecipeInput({ ...recipeInput, instructions: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end items-center m-1">
            <label className="" htmlFor="image">
              Image URL:
            </label>
            <input
              type="text"
              name="image"
              className="text-md"
              value={recipeInput.imageUrl}
              placeholder="Image URL..."
              onChange={(e) =>
                setRecipeInput({ ...recipeInput, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="flex flex-nowrap justify-center">
            <button
              type="submit"
              className="bg-green-400 shadow-md hover:shadow-none m-1 px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-400 shadow-md hover:shadow-none m-1 px-6 py-2 rounded-md"
              onClick={() => setAddRecipe(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {/* <span>{titleValue}</span> */}

      {/* <div>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <div>{recipe.title}</div>
              <span>{recipe.ingredients}</span>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default FormRecipe;
