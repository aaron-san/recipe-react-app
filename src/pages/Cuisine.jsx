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
    <div className="flex items-center justify-center gap-4 max-w-[50vw] flex-wrap my-4 mx-auto">
      {filteredRecipes.map((recipe) => {
        return (
          <div
            className="flex flex-wrap items-center rounded-md hover:shadow-md"
            key={recipe.id}
          >
            <NavLink to={`/recipe/${recipe.id}`}>
              <img
                src={`/assets/images/${recipe.image}`}
                alt={recipe.title}
                width="100%"
                height="auto"
                className="rounded-t-md h-[180px] w-[200px]"
              />
              <div className="w-full h-[60px] px-2 py-1 border shadow-md bg-slate-100 border-b-slate-400 rounded-b-md flex items-center justify-center">
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
