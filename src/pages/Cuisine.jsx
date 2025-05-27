import React, { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuth } from "firebase/auth";
// import { AiOutlineEdit } from "react-icons/ai";
import { auth } from "../config/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

import {
  useFetchRecipesQuery,
  useAddNewRecipeMutation,
  useUpdateInstructionsMutation,
} from "../features/recipes/recipesApi";
// import { db } from "../config/firebase";
// import {
//   updateDoc,
//   doc,
//   deleteDoc,
//   getDocs,
//   collection,
// } from "firebase/firestore";

const Cuisine = () => {
  // const navigate = useNavigate();
  const { user } = useAuth();

  let params = useParams();
  // const dispatch = useDispatch();

  // const recipes = useSelector((state) => state.recipes.value);

  const { data: recipes, error, isLoading } = useFetchRecipesQuery();

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.tag?.split(";").includes(params.type);
  });

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mx-auto my-4 max-w-[80vw]">
      {filteredRecipes.map((recipe) => {
        return (
          <div
            className="flex flex-wrap items-center hover:shadow-md rounded-md"
            key={recipe.id}
          >
            <NavLink to={`/recipe/${recipe.id}`}>
              <img
                src={`/assets/images/${recipe.image}`}
                alt={recipe.title}
                width="100%"
                height="auto"
                className="rounded-t-md w-[200px] h-[180px]"
              />
              <div className="flex justify-center items-center bg-emerald-100 shadow-md px-2 py-1 border border-b-emerald-400 rounded-b-md w-[200px] h-[60px] text-center">
                <p>{recipe.title}</p>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Cuisine;
