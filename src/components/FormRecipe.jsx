import React, { useState } from "react";
import { nanoid } from "nanoid";
// import { addRecipeRedux } from "../features/recipes/slices/recipesSlice";
// Authentication
// import { getAuth } from "firebase/auth";
// import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
// import { useAddNewRecipeMutation } from "../features/recipes/recipesApi";

// const res = await cityRef.update({capital: true});

const FormRecipe = ({ addRecipe, setAddRecipe, addNote }) => {
  // const [addNewRecipe, { isLoading }] = useAddNewRecipeMutation();
  const { user } = useAuth();

  // "id": "chickenTenders",
  // "title": "Chicken Tenders",
  // "tag": "main-dishes; chicken",
  // "ingredients": "soy souce; garlic; ginger; salt and pepper",
  // "instructions": "Mix all raw ingredients; Dip in beaten egg batter; Cover in bread crumbs; Bake for 15 minutes at 400°F.",
  // "image": "tomatoSoup.png"

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");

  // const [addRecipe, setAddRecipe] = useState(false);

  // const dispatch = useDispatch();
  // const recipes = useSelector((state) => state.recipes.value);

  const handleAddRecipe = async (e) => {
    // Prevent server submission
    e.preventDefault();

    const newRecipe = {
      id: nanoid(),
      title,
      tags,
      ingredients: formatStringToArray(ingredients),
      instructions: formatStringToArray(instructions),
      image,
    };
    // await addNewRecipe(newRecipe);
    // await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);

    setTitle("");
    setTags([]);
    setIngredients([]);
    setInstructions([]);
    setImage("");
    setAddRecipe(false);
  };
  //   console.log("Form - recipes length:", recipes.length);

  function formatStringToArray(str) {
    return str
      .split(";")
      .map((el) => el.trim())
      .filter((el) => el !== "");
  }

  return (
    <div className="flex justify-center gap-4">
      {!addRecipe && !addNote && (
        <button
          className="bg-emerald-400 hover:bg-emerald-400/90 shadow-md my-4 px-6 py-2 border border-slate-800 rounded-xl text-slate-800 active-translate-y-[1px]"
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
        <form className="flex justify-center p-5 border border-gray-300 font-bold">
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
              value={title}
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="tags">Tags:</label>
            <select
              name="tags"
              className="text-md"
              value={tags}
              onChange={(e) => {
                const options = [...e.target.selectedOptions];
                const values = options.map((option) => option.value);
                setTags(values);
              }}
              multiple={true}
            >
              <option value="main-dishes">Main Dish</option>
              <option value="side-dishes">Side Dish</option>
            </select>
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="ingredients">Ingredients: </label>
            <input
              type="text"
              name="ingredients"
              className="text-md"
              required
              value={ingredients}
              placeholder="rice; potatoes; ..."
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center m-1">
            <label htmlFor="instructions">Instructions: </label>
            <textarea
              type="text"
              name="instructions"
              className="m-2 p-2 border border-blue-600 w-[226px] text-md"
              required
              value={instructions}
              placeholder="[instruction1; instruction2; ...]"
              onChange={(e) => setInstructions(e.target.value)}
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
              value={image}
              placeholder="Image URL..."
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="flex flex-nowrap justify-center">
            <button
              className="bg-green-400 shadow-md hover:shadow-none m-1 px-6 py-2 rounded-md"
              onClick={(e) => handleAddRecipe(e)}
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
