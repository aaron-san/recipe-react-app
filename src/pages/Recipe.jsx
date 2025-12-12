import { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import Note from "../components/Note";
// import recipes from "../data/recipes.json";
import { db } from "../config/firebase";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import Markdown from "react-markdown";
import AddNote from "./AddNote";
// import { IoSaveOutline } from "react-icons/io5";
// import { CiCirclePlus } from "react-icons/ci";

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
  useUpdateInstructionsMutation,
  useUpdateTitleMutation,
  useDeleteRecipeMutation,
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
  const instructionsRef = useRef();
  const titleRef = useRef();
  const imageRef = useRef();

  const [addNote, setAddNote] = useState(false);

  const {
    data: recipe,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchRecipeQuery(recipeId);

  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();

  const [updateTitle] = useUpdateTitleMutation();
  const [updateIngredients] = useUpdateIngredientsMutation();
  const [updateInstructions] = useUpdateInstructionsMutation();

  const { user } = useAuth();
  const navigate = useNavigate();

  const initRecipeInput = {
    title: "",
    tags: [],
    ingredients: [],
    instructions: "",
    imageUrl: "",
  };
  const [recipeInput, setRecipeInput] = useState(initRecipeInput);

  const [editInstructions, setEditInstructions] = useState(false);
  const [editIngredients, setEditIngredients] = useState(false);
  const [editHref, setEditHref] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const handleDelete = async (id) => {
    if (id === null) return;
    const response = prompt("Please type 'DELETE' to delete.");
    if (response === "DELETE") {
      await deleteRecipe(id);
      navigate("/");
    }
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

  const handleUpdateInstructions = async () => {
    // dispatch(updateInstructionsRedux({ id, instructions: value }));
    const newInstructions = instructionsRef.current.value
      .split(/\n/)
      .filter((instruction) => instruction !== "");
    if (!newInstructions) return;
    await updateInstructions({ recipeId, newInstructions });
    setEditInstructions(false);
  };

  if (isLoading || !recipe) {
    return (
      <div className="flex justify-center mt-18 h-screen">
        <div className="mt-20 font-bold text-xl animate-pulse">Loading...</div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex md:flex-row flex-col justify-center gap-8 mx-auto my-12 w-90 max-w-[95%]">
          <div className="flex flex-col items-center max-w-[400px]">
            <div className="rounded">
              <img
                src={`/assets/images/${recipe.image}`}
                alt={recipe.title}
                className="shadow-xl border-8 border-white rounded-lg w-60 md:min-w-[200px] h-auto md:min-h-[200px]"
              />
            </div>
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
            <div className="mt-20"></div>

            {editTitle && user && (
              <div className="flex items-center mt-4">
                <textarea
                  className="p-2 border-2 border-blue-400 rounded-md w-full"
                  defaultValue={recipe.title}
                  rows={1}
                  cols={30}
                  ref={titleRef}
                />
                <button
                  onClick={handleUpdateTitle}
                  type="submit"
                  className="bg-green-200 shadow-md hover:shadow-none ml-2 px-3 py-1 rounded-md h-10"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="">
            <h2 className="mb-4">Ingredients</h2>

            <div className="flex justify-between items-center mb-8 border-transparent w-full">
              <ul
                className={`flex flex-col ${
                  !user ? "cursor-auto" : "cursor-pointer"
                }`}
                onClick={() =>
                  user && !editIngredients && setEditIngredients(true)
                }
              >
                {!editIngredients &&
                  recipe.ingredients?.map((item, id) => (
                    <div className="flex gap-2" key={item}>
                      <div className="flex pt-1.5 text-pink-400 text-xl">
                        <BiSolidRightArrowAlt />
                      </div>
                      <IngredientItem
                        recipe={recipe}
                        ingredient={item}
                        ingredientItemId={id}
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
                      className="mt-4 p-2 border-2 border-blue-400 rounded-md w-full"
                      rows={recipe.ingredients.length + 1}
                      // cols={40}
                      defaultValue={recipe.ingredients.join("\n") + "\n"}
                      ref={ingredientsRef}
                      autoFocus
                    />

                    <div className="flex flex-row justify-around gap-2 w-full">
                      <button
                        type="submit"
                        className="bg-green-200 shadow-md hover:shadow-none my-2 ml-0 px-3 py-1 rounded-md w-1/2"
                        onClick={handleUpdateIngredients}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-red-200 shadow-md hover:shadow-none my-2 px-3 py-1 rounded-md w-1/2"
                        onClick={() => setEditIngredients(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <h2>Instructions</h2>
              {!editInstructions && user && (
                <button
                  className="opacity-30 hover:opacity-100 hover:shadow-sm p-2 rounded-full h-fit"
                  onClick={() => setEditInstructions(true)}
                >
                  <MdOutlineModeEdit />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mb-8 lg:w-[400px]">
              <ol>
                {
                  recipe.instructions && (
                    <div className="ml-6 py-1">
                      <Markdown>{recipe.instructions.join("\n")}</Markdown>
                    </div>
                  )
                  // recipe.instructions.map((item) => (
                  //   <li key={item} className="ml-6 py-1">
                  //     <span>{item}</span>
                  //   </li>
                  // ))
                }

                {/* Edit instructions mode */}
                {editInstructions && !user && <SignIn />}
                {editInstructions && user && (
                  <li className="flex flex-row flex-wrap max-w-[400px]">
                    <textarea
                      className="mt-4 p-2 border-2 border-blue-400 rounded-md w-full"
                      ref={instructionsRef}
                      rows={4}
                      cols={40}
                      defaultValue={recipe.instructions.join("\n")}
                      onChange={(e) =>
                        setRecipeInput({
                          ...recipeInput,
                          instructions: e.target.value,
                        })
                      }
                    />
                    <div className="flex flex-row justify-around gap-2 w-full">
                      <button
                        type="button"
                        className="bg-green-200 shadow-md hover:shadow-none my-2 ml-0 px-3 py-1 rounded-md w-1/2"
                        onClick={handleUpdateInstructions}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-red-200 shadow-md hover:shadow-none my-2 px-3 py-1 rounded-md w-1/2"
                        onClick={() => setEditInstructions(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                )}
              </ol>
            </div>

            {!editIngredients && user && (
              <button
                className="opacity-30 hover:opacity-100 mt-20 p-1 border border-red-300 rounded-full text-red-400 active:translate-y-[1px]"
                onClick={() => handleDelete(recipeId)}
              >
                Delete Recipe
              </button>
            )}
          </div>
        </div>
        <Note />
        <AddNote
          addNote={addNote}
          setAddNote={setAddNote}
          // addRecipe={addRecipe}
        />
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
