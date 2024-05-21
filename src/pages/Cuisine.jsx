import React, { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { AiOutlineEdit } from "react-icons/ai";

import {
  updateInstructionsRedux,
  updateIngredientsRedux,
  deleteRecipeRedux,
  updateHrefRedux,
} from "../features/recipes/recipesSlice";
import { db } from "../config/firebase";
import {
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const Cuisine = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  let params = useParams();
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.value);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.tag?.split(";").includes(params.type);
  });

  return (
    <div className="flex items-center justify-center gap-4 max-w-[50vw] flex-wrap my-4 mx-auto">
      {filteredRecipes.map((recipe) => {
        return (
          <div
            className="flex flex-wrap items-center w-[200px] hover:shadow-md rounded-md"
            key={recipe.id}
          >
            <NavLink to={`/recipe/${recipe.id}`}>
              <img
                src={`/assets/images/${recipe.image}`}
                alt={recipe.title}
                width="100%"
                height="auto"
                className="rounded-t-md"
              />
              <div className="w-full h-[60px] px-2 py-1 border shadow-md bg-slate-100 border-b-slate-400 rounded-b-md text-center">
                {recipe.title}
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Cuisine;
