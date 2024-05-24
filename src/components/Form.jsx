import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { nanoid } from "nanoid";
import { addRecipeRedux } from "../features/recipes/recipesSlice";
// Authentication
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

// const res = await cityRef.update({capital: true});

const Form = ({ addForm, setAddForm }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // "id": "chickenTenders",
  // "title": "Chicken Tenders",
  // "tag": "main-dishes; chicken",
  // "ingredients": "soy souce; garlic; ginger; salt and pepper",
  // "instructions": "Mix all raw ingredients; Dip in beaten egg batter; Cover in bread crumbs; Bake for 15 minutes at 400°F.",
  // "image": "tomatoSoup.png"

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  // const [addForm, setAddForm] = useState(false);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.value);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const newRecipe = {
      id: nanoid(),
      title,
      tags,
      ingredients,
      instructions,
      image,
    };
    dispatch(addRecipeRedux(newRecipe));
    await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);

    setTitle("");
    setTags("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setAddForm(false);
  };
  //   console.log("Form - recipes length:", recipes.length);

  return (
    <div className="flex justify-center mt-4">
      {!addForm && (
        <button
          className="px-6 py-2 m-1 text-slate-800 border border-slate-800 active-translate-y-[1px] rounded-md shadow-md hover:bg-slate-100"
          onClick={() => setAddForm(!addForm)}
        >
          Add Recipe
        </button>
      )}
      {addForm && !user && (
        <div>
          Please{" "}
          <Link to="/login" className="text-blue-500 underline">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Register
          </Link>{" "}
          to add a recipe.
        </div>
      )}

      {addForm && user && (
        <form className="flex justify-center p-5 font-bold border border-gray-300">
          <h1 className="self-center my-2 text-3xl text-red-700 underline uppercase ">
            Add Recipe
          </h1>
          <div className="flex items-center justify-end m-1">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              className="text-md"
              autoFocus
              value={title}
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end m-1">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              name="tags"
              className="text-md"
              value={tags}
              placeholder="Tags..."
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end m-1">
            <label htmlFor="ingredients">Ingredients: </label>
            <input
              type="text"
              name="ingredients"
              className="text-md"
              value={ingredients}
              placeholder="Ingredients..."
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end m-1">
            <label htmlFor="instructions">Instructions: </label>
            <textarea
              type="text"
              name="instructions"
              className="p-2 m-2 border border-blue-600 text-md w-[226px]"
              value={instructions}
              placeholder="Instructions..."
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-end m-1">
            <label className="" htmlFor="image">
              Image URL:{" "}
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
          <div className="flex justify-center flex-nowrap">
            <button
              className="px-6 py-2 m-1 bg-green-400 rounded-md shadow-md hover:shadow-none"
              onClick={(e) => handleAddRecipe(e)}
            >
              Submit
            </button>
            <button
              className="px-6 py-2 m-1 bg-red-400 rounded-md shadow-md hover:shadow-none"
              onClick={() => setAddForm(false)}
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

export default Form;
