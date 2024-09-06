import React, { useState, useRef, useCallback, useEffect } from "react";
// import { MdOutlineModeEdit } from "react-icons/md";

import { IoSaveOutline } from "react-icons/io5";
// import //   useAddNewRecipeMutation,
// useUpdateIngredientMutation,
// "../features/recipes/recipesApi";
// import { useDispatch, useSelector } from "react-redux";

const IngredientItem = ({ ingredient, ingredientItemId, recipe }) => {
  // const [addNewRecipe, { isLoading: isRecipeLoading }] =
  // console.log(ingredient);
  //   useAddNewRecipeMutation();
  // const [updateIngredient] = useUpdateIngredientMutation();

  // const [newIngredient, setNewIngredient] = useState();
  // const ingredientRef = useRef();

  const handleSave = async () => {
    // e.preventDefault();
    // updateIngredient({
    //   recipe,
    //   ingredient: newIngredient,
    //   ingredientItemId,
    // });
    // const updatedRecipe = {
    //   ...recipe,
    //   ingredients: { ingredientItemId: newIngredient },
    // };
    // console.log(updatedRecipe);
    // await setDoc(doc(db, "recipes", recipe.id), updatedRecipe);
    // setNewIngredient(ingredientRef.current.value);
    // setEditIngredient(false);
    // setEditIngredient(false);
  };

  // useEffect(() => {
  //   const handleEsc = (event) => {
  //     if (event.key === "Escape") {
  //       console.log("Close");
  //       editIngredient && setEditIngredient(false);
  //     }
  //   };
  //   window.addEventListener("keydown", handleEsc);

  //   return () => {
  //     window.removeEventListener("keydown", handleEsc);
  //   };
  // }, []);

  return (
    <div className="border-red-500 border-1">
      {/* {editIngredient ? ( */}
      {/* <li className="flex gap-2">
        <input
          type="text"
          defaultValue={ingredient}
          // ref={ingredientRef}
          // onChange={(e) => setNewIngredient(e.target.value)}
          className="rounded-md"
        />
        <button onClick={(e) => handleSave(e)}>
          <span className="text-2xl">
            <IoSaveOutline />
          </span>
        </button>
      </li> */}
      {/* ) : ( */}
      <>
        <li className="flex gap-2">
          <div
            // onClick={() => setEditIngredient(true)}
            // className="p-1 hover:shadow-sm hover:cursor-pointer"
            className="p-1"
          >
            {ingredient}
          </div>
        </li>
      </>
      {/* )} */}
    </div>
  );
};

export default IngredientItem;
