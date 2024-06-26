import { useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";
import SignIn from "../components/SignIn";
// import recipes from "../data/recipes.json";
import { db } from "../config/firebase";
import {
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInstructionsRedux,
  updateIngredientsRedux,
  deleteRecipeRedux,
  addRecipeRedux,
  clearStateRedux,
  updateHrefRedux,
} from "../features/recipes/recipesSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { getAuth } from "firebase/auth";
// id  "0632d7e0-9272-4505-8773-b1576b08654b"
// image "mini-hotdogs.png"
// ingredients "1 sheet puff pastry (or make own); 1 egg; 8 cocktail frankfurters; tomato sauce"
// instructions  "Cut thawed pastry into 8 pieces. Brush with beaten egg before placing a frankfurter across each pastry piece. Wrap opposite ends of pastry around the fankfurter. brush with egg again. Bake in 180°C for 10-15 minutes or until golden. Serve with a bowl of tomato sauce for dipping."
// tag "main-dishes; hotdogs"
// title "Mini Hotdogs"

const Recipe = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  let params = useParams();
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.value);

  const filteredRecipe = recipes.filter(
    (recipe) => recipe.id === params.name
  )[0];
  // return filteredData;
  // }
  // const initialRecipes = getRecipes(db);

  // setRecipeData(initialRecipes);
  // }, []);
  //   const [details, setDetails] = useState({});
  // const [activeTab, setActiveTab] = useState("instructions");
  // const recipesWithId = recipeData.filter((recipe) => recipe.id);
  const [instructions, setInstructions] = useState("");
  const [editInstructions, setEditInstructions] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [editIngredients, setEditIngredients] = useState(false);
  const [Href, setHref] = useState("");
  const [editHref, setEditHref] = useState(false);

  const handleDelete = async (id) => {
    if (id === null) return;
    const response = prompt("Please type 'DELETE' to delete.");
    if (response === "DELETE") {
      dispatch(deleteRecipeRedux({ id }));
      navigate("/");
    }
  };

  const updateInstructions = async (id, value) => {
    dispatch(updateInstructionsRedux({ id, instructions: value }));
    setEditInstructions(false);
  };

  const updateIngredients = async (id, value) => {
    if (!value) return;

    const docRef = doc(db, "recipes", id);
    if (!docRef) return new Error("No doc ref!");

    dispatch(updateIngredientsRedux({ id: id, ingredients: value }));
    await updateDoc(docRef, { ingredients: value });
    setEditIngredients(false);
  };

  const updateHref = async (id, value) => {
    // if (!value) {
    // setEditHref(false);
    // return;
    // }
    const docRef = doc(db, "recipes", id);
    if (!docRef) return new Error("No doc ref!");

    dispatch(updateHrefRedux({ id, href: value }));
    setEditHref(false);
  };

  return (
    <DetailWrapper>
      <div className="flex flex-col items-center">
        <img
          src={`/assets/images/${filteredRecipe.image}`}
          alt={filteredRecipe.title}
          height="50px"
          width="50px"
        />
        <div className="flex items-baseline justify-center gap-2">
          <h2>{filteredRecipe.title}</h2>
          {!editHref && user && (
            <button
              onClick={() => setEditHref(true)}
              className="px-3 py-4 opacity-30 h-fit hover:shadow-md hover:opacity-100"
            >
              <AiOutlineEdit />
            </button>
          )}
        </div>

        {editHref && user && (
          <div>
            <input
              defaultValue={filteredRecipe.image}
              onChange={(e) => setHref(e.target.value)}
            />
            <button onClick={() => updateHref(filteredRecipe.id, Href)}>
              Save
            </button>
          </div>
        )}

        {/* <img src={"../assets/images/" + filteredRecipe.image} alt="" /> */}
      </div>
      <InfoCard>
        <div className="flex items-center gap-4 mb-4">
          <h2>Instructions</h2>
          {!editInstructions && user && (
            <button
              className="px-3 py-4 opacity-30 h-fit hover:shadow-md hover:opacity-100"
              onClick={() => setEditInstructions(true)}
            >
              <AiOutlineEdit />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mb-8">
          <ol>
            {filteredRecipe.instructions?.split(";").map((item) => (
              <li key={item} className="ml-6">
                <span>{item}</span>
              </li>
            ))}

            {/* Edit instructions mode */}
            {editInstructions && !user && <SignIn />}

            {editInstructions && user && (
              <li className="flex flex-row flex-wrap">
                <textarea
                  className="w-full p-2 border border-gray-400"
                  rows={4}
                  cols={40}
                  // onChange={}
                  defaultValue={filteredRecipe.instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-green-200 w-[200px] rounded-md shadow-md hover:shadow-none px-3 py-1 m-2 ml-0"
                  onClick={(e) => {
                    updateInstructions(filteredRecipe.id, instructions);
                  }}
                >
                  Submit
                </button>
                <button
                  className="bg-red-200 w-[200px] rounded-md shadow-md hover:shadow-none px-3 py-1 m-2"
                  onClick={() => setEditInstructions(false)}
                >
                  Cancel
                </button>
              </li>
            )}
          </ol>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <h2>Ingredients</h2>
          {!editIngredients && user && (
            <button
              className="px-3 py-4 opacity-30 h-fit hover:shadow-md hover:opacity-100"
              onClick={() => setEditIngredients(true)}
            >
              <AiOutlineEdit />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <ul>
            {!editIngredients &&
              filteredRecipe.ingredients?.split(";").map((item) => (
                <li key={item} className="flex w-fit">
                  <span>{item}</span>
                </li>
              ))}

            {editIngredients && !user && <SignIn />}

            {editIngredients && user && (
              <li className="flex flex-row flex-wrap">
                <textarea
                  className="w-full p-2 border border-gray-400"
                  rows={4}
                  cols={40}
                  // onChange={}
                  defaultValue={filteredRecipe.ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-green-200 w-[200px] rounded-md shadow-md hover:shadow-none px-3 py-1 m-2 ml-0"
                  onClick={(e) => {
                    updateIngredients(filteredRecipe.id, ingredients);
                  }}
                >
                  Submit
                </button>
                <button
                  className="bg-red-200 w-[200px] rounded-md shadow-md hover:shadow-none px-3 py-1 m-2"
                  onClick={() => setEditIngredients(false)}
                >
                  Cancel
                </button>
              </li>
            )}
          </ul>
        </div>
        {!editIngredients && user && (
          <button
            className="p-2 mt-20 text-red-400 border border-red-300 rounded-full opacity-30 hover:opacity-100 active:translate-y-[1px]"
            onClick={() => handleDelete(filteredRecipe.id)}
          >
            Delete Recipe
          </button>
        )}
      </InfoCard>
    </DetailWrapper>

    // {recipeData.map((recipe) => {
    //   return <li>{recipe.id}</li>;
    // })}
  );
};

export default Recipe;

const DetailWrapper = styled.div`
  margin: 4rem 10rem;
  display: flex;
  align-items: flex-start;
  border-radius: 15px;
  justify-content: center;

  .active {
    /* background: aquamarine; */
    color: black;
    border: 4px solid aquamarine;
  }

  h2 {
    margin-top: 0;
    padding: 5px;
    font-size: 2.2rem;
    color: #313131;
    background: rgba(250, 250, 250, 0.4);
    text-decoration: underline;
    text-decoration-color: lightblue;
    text-align: center;

    @media (max-width: 640px) {
      margin-bottom: 1rem;
    }
  }
  li {
    line-height: 2.3rem;
  }
  ul {
    margin-top: 1rem;
  }

  img {
    background: white;
    border-radius: 10px;
    box-shadow: 3px 3px 5px lightgray;
    padding: 10px;
    max-width: 250px;
    max-height: 200px;
    width: auto;
    height: auto;
  }
  @media (max-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
    h2 {
      padding: 8px 0;
      line-height: 2rem;
      font-size: 2rem;
    }
    line-height: 1.7rem;
    div {
      border: none;
    }
    margin: 1px;
    ul {
      padding: 8px;
      margin: 0;
    }
    li {
      line-height: 1.7rem;
    }
  }
`;

const InfoCard = styled.div`
  margin-left: 10rem;
  width: 100%;
  max-width: 600px;
  /* background: pink; */
  /* border: 2px solid #a67025; */
  border-radius: 15px;
  padding: 0 10px;

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 10px;
    // font-size: 11px;
  }
`;
