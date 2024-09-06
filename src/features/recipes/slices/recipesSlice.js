import { createSlice } from "@reduxjs/toolkit";

export const recipesSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authToken: null,
  },
  reducers: {
    saveUser(state, action) {
      state.user = action.payload;
    },
    saveToken(state, action) {
      state.authToken = action.payload;
    },
  },
});

export const { saveUser, saveToken } = recipesSlice.actions;

// selectors
export const getRecipes = (state) => state.recipes.recipes;

export default recipesSlice;
