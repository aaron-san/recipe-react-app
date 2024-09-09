import { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";
import SignIn from "../components/SignIn";
import Note from "../components/Note";
// import recipes from "../data/recipes.json";
import { db } from "../config/firebase";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { IoSaveOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

import IngredientItem from "../components/IngredientItem";

import {
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  useFetchRecipeQuery,
  useUpdateIngredientsMutation,
  useUpdateTitleMutation,
} from "../features/recipes/recipesApi";
// import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

import { MdOutlineModeEdit } from "react-icons/md";
// id  "0632d7e0-9272-4505-8773-b1576b08654b"
// image "mini-hotdogs.png"
// ingredients "1 sheet puff pastry (or make own); 1 egg; 8 cocktail frankfurters; tomato sauce"
// instructions  "Cut thawed pastry into 8 pieces. Brush with beaten egg before placing a frankfurter across each pastry piece. Wrap opposite ends of pastry around the fankfurter. brush with egg again. Bake in 180°C for 10-15 minutes or until golden. Serve with a bowl of tomato sauce for dipping."
// tag "main-dishes; hotdogs"
// title "Mini Hotdogs"

const Recipe = () => {
  let params = useParams();
  const { recipeId } = params;

  const ingredientsRef = useRef();
  const titleRef = useRef();
  const imageRef = useRef();

  const {
    data: recipe,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchRecipeQuery(recipeId);

  const [updateTitle] = useUpdateTitleMutation();
  const [updateIngredients] = useUpdateIngredientsMutation();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [instructions, setInstructions] = useState("");
  const [editInstructions, setEditInstructions] = useState(false);
  // const [ingredients, setIngredients] = useState([]);
  const [editIngredients, setEditIngredients] = useState(false);
  const [href, setHref] = useState("");
  const [editHref, setEditHref] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const handleDelete = async (id) => {
    if (id === null) return;
    const response = prompt("Please type 'DELETE' to delete.");
    if (response === "DELETE") {
      // dispatch(deleteRecipeRedux({ id }));
      navigate("/");
    }
  };

  const updateInstructions = async (id, value) => {
    // dispatch(updateInstructionsRedux({ id, instructions: value }));
    setEditInstructions(false);
  };

  const updateHref = async (id, value) => {
    // if (!value) {
    // setEditHref(false);
    // return;
    // }
    const docRef = doc(db, "recipes", id);
    if (!docRef) return new Error("No doc ref!");

    // dispatch(updateHrefRedux({ id, href: value }));
    setEditHref(false);
  };

  // const handleAddIngredient = () => {
  //   setShowAddIngredient(true);
  // };

  // const handleAddNewIngredient = async () => {
  //   const newIngredient = newIngredientRef.current.value;
  //   await addIngredient({ recipeId, newIngredient });
  //   setShowAddIngredient(false);
  // };

  // useEffect(() => {
  //   const handleEsc = (event) => {
  //     if (event.key === "Escape") {
  //       console.log("Close");
  //       console.log(showAddIngredient);
  //       if (showAddIngredient) {
  //         setShowAddIngredient(false);
  //       }
  //       if (editIngredient) {
  //         setEditIngredient(false);
  //       }
  //     }
  //   };
  //   window.addEventListener("keydown", handleEsc);

  //   return () => {
  //     window.removeEventListener("keydown", handleEsc);
  //   };
  // }, []);

  const handleUpdateTitle = async () => {
    const newTitle = titleRef.current.value;
    if (!newTitle) return;
    await updateTitle({ recipeId, newTitle });
    setEditTitle(false);
  };

  const handleUpdateIngredients = async () => {
    const newIngredients = ingredientsRef.current.value
      .split(/\n/)
      .filter((ingredient) => ingredient !== "");
    if (!newIngredients) return;
    await updateIngredients({ recipeId, newIngredients });
    setEditIngredients(false);
  };

  if (isLoading || !recipe) {
    return (
      <div className="flex justify-center mt-18 h-screen">
        <div className="text-xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row justify-center w-90 md:max-w-[1000px] mx-auto my-6 gap-4 mx-4">
        <div className="flex flex-col items-center max-w-[400px] md:h-[900px] mt-4">
          <img
            src={`/assets/images/${recipe.image}`}
            alt={recipe.title}
            className="w-90 md:min-h-[300px] md:min-w-[300px] shadow-md rounded-lg border-8 border-emerald-200"
          />
          {!editTitle && (
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={() => user && setEditTitle(true)}
                className={`p-2 h-fit rounded-sm ${
                  !user ? "cursor-auto" : "cursor-pointer"
                }`}
              >
                <h1>{recipe.title}</h1>
              </button>
            </div>
          )}

          {editTitle && user && (
            <div className="flex items-center mt-4">
              <textarea
                className="w-full p-2 border-2 border-blue-400 rounded-md"
                defaultValue={recipe.title}
                rows={1}
                cols={30}
                ref={titleRef}
              />
              <button
                onClick={handleUpdateTitle}
                type="submit"
                className="bg-green-200 rounded-md shadow-md hover:shadow-none px-3 py-1 ml-2 h-10"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex items-center gap-4 mb-4">
            <h2>Instructions</h2>
            {!editInstructions && user && (
              <button
                className="p-2 opacity-30 h-fit hover:shadow-sm hover:opacity-100 rounded-full"
                onClick={() => setEditInstructions(true)}
              >
                <MdOutlineModeEdit />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mb-8 lg:w-[400px]">
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((item) => (
                  <li key={item} className="ml-6">
                    <span>{item}</span>
                  </li>
                ))}

              {/* Edit instructions mode */}
              {editInstructions && !user && <SignIn />}
              {editInstructions && user && (
                <li className="flex flex-row flex-wrap max-w-[400px]">
                  <textarea
                    className="w-full p-2 border-2 border-blue-400 mt-4 rounded-md"
                    rows={4}
                    cols={40}
                    defaultValue={recipe.instructions.join("\n")}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                  <div className="flex flex-row gap-2 justify-around w-full">
                    <button
                      type="button"
                      className="bg-green-200 w-1/2 rounded-md shadow-md hover:shadow-none px-3 py-1 my-2 ml-0"
                      onClick={() => {
                        updateInstructions(recipe.id, instructions);
                      }}
                    >
                      Submit
                    </button>
                    <button
                      className="bg-red-200 w-1/2 rounded-md shadow-md hover:shadow-none px-3 py-1 my-2"
                      onClick={() => setEditInstructions(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <h2>Ingredients</h2>
          </div>

          <div className="flex items-center  border-transparent justify-between mb-8 w-[400px]">
            <ul
              className={`flex flex-col gap-1 ${
                !user ? "cursor-auto" : "cursor-pointer"
              }`}
              onClick={() =>
                user && !editIngredients && setEditIngredients(true)
              }
            >
              {!editIngredients &&
                recipe.ingredients?.map((item, id) => (
                  <div className="flex gap-2" key={item}>
                    <div className="flex pt-3 text-pink-400">
                      <BiSolidRightArrowAlt />
                    </div>
                    <IngredientItem
                      recipe={recipe}
                      ingredient={item}
                      ingredientItemId={id}
                      // editIngredient={editIngredient}
                      // setEditIngredient={setEditIngredient}
                      className="w-fit"
                    >
                      {item}
                    </IngredientItem>
                  </div>
                ))}

              {editIngredients && !user && <SignIn />}

              {editIngredients && user && (
                <li className="flex flex-row flex-wrap max-w-[400px]">
                  <textarea
                    className="w-full p-2 border-2 border-blue-400 mt-4 rounded-md"
                    rows={recipe.ingredients.length + 1}
                    // cols={40}
                    defaultValue={recipe.ingredients.join("\n") + "\n"}
                    ref={ingredientsRef}
                    autoFocus
                  />

                  <div className="flex flex-row gap-2 justify-around w-full">
                    <button
                      type="submit"
                      className="bg-green-200 w-1/2 rounded-md shadow-md hover:shadow-none px-3 py-1 my-2 ml-0"
                      onClick={handleUpdateIngredients}
                    >
                      Submit
                    </button>
                    <button
                      className="bg-red-200 w-1/2 rounded-md shadow-md hover:shadow-none px-3 py-1 my-2"
                      onClick={() => setEditIngredients(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
          {!editIngredients && user && (
            <button
              className="p-1 mt-20 text-red-400 border border-red-300 rounded-full opacity-30 hover:opacity-100 active:translate-y-[1px]"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete Recipe
            </button>
          )}
        </div>

        <Note />
      </div>

      //   // {recipeData.map((recipe) => {
      //   //   return <li>{recipe.id}</li>;
      //   // })}
    );
  }
};

export default Recipe;

// const DetailWrapper = styled.div`
//   margin: 4rem 10rem;
//   display: flex;
//   align-items: flex-start;
//   border-radius: 15px;
//   justify-content: center;

//   .active {
//     /* background: aquamarine; */
//     color: black;
//     border: 4px solid aquamarine;
//   }

//   h2 {
//     margin-top: 0;
//     padding: 5px;
//     font-size: 2.2rem;
//     color: #313131;
//     background: rgba(250, 250, 250, 0.4);
//     text-decoration: underline;
//     text-decoration-color: lightblue;
//     text-align: center;

//     @media (max-width: 640px) {
//       margin-bottom: 1rem;
//     }
//   }
//   li {
//     line-height: 2.3rem;
//   }
//   ul {
//     margin-top: 1rem;
//   }

//   img {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 3px 3px 5px lightgray;
//     padding: 10px;
//     max-width: 250px;
//     max-height: 200px;
//     width: auto;
//     height: auto;
//   }
//   @media (max-width: 640px) {
//     justify-content: center;
//     flex-wrap: wrap;
//     h2 {
//       padding: 8px 0;
//       line-height: 2rem;
//       font-size: 2rem;
//     }
//     line-height: 1.7rem;
//     div {
//       border: none;
//     }
//     margin: 1px;
//     ul {
//       padding: 8px;
//       margin: 0;
//     }
//     li {
//       line-height: 1.7rem;
//     }
//   }
// `;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   color: #313131;
//   font-size: 1.2rem;
//   background: #fff;
//   border: 2px solid #666;
//   box-shadow: 2px 2px 5px 3px #888888;
//   border-radius: 15px;
//   margin-top: 10px;
//   margin-right: 2rem;
//   margin-bottom: 2rem;
//   font-weight: 600;

//   @media (max-width: 640px) {
//     margin-right: 1rem;
//     margin-bottom: 1rem;
//     font-size: 1rem;
//     padding: 8px;
//   }
// `;

// const InfoCard = styled.div`
//   margin-left: 10rem;
//   width: 100%;
//   max-width: 600px;
//   /* background: pink; */
//   /* border: 2px solid #a67025; */
//   border-radius: 15px;
//   padding: 0 10px;

//   @media (max-width: 640px) {
//     margin: 1rem;
//     padding: 10px;
//     // font-size: 11px;
//   }
// `;

// const ContentWrapper = styled.div`
//   background: white;

//   border: 3px solid transparent;
//   border-image: linear-gradient(45deg, #db8594, pink);
//   border-image-slice: 1;
//   padding: 10px 20px;
//   color: #313131;
//   font-size: 1.6rem;
//   // text-align: justify;
//   line-height: 2.4rem;

//   @media (max-width: 640px) {
//     font-size: 1.1rem;
//     line-height: 1.5rem;
//     li {
//       // padding-left: 2px;
//     }
//   }
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: space-evenly;
// `;
