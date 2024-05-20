// import { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    // Set initial value to nothing. Import data from Firestore and add it later
    value: [],
    // value: [
    //   {
    //     id: "",
    //     title: "",
    //     tage: "",
    //     ingredients: "",
    //     instructions: "",
    //     image: "",
    //   },
    // ],
  },
  reducers: {
    addRecipeRedux: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   state.value += 1;
      state.value.unshift(action.payload);
    },
    updateInstructionsRedux: (state, action) => {
      if (!action.payload.instructions) return;

      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.instructions = action.payload.instructions;
        }
      });
      const docRef = doc(db, "recipes", action.payload.id);
      if (!docRef) return new Error("No doc ref!");
      updateDoc(docRef, { instructions: action.payload.instructions });
    },
    updateIngredientsRedux: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.ingredients = action.payload.ingredients;
        }
      });

      if (!action.payload) return;
      const docRef = doc(db, "recipes", action.payload.id);
      if (!docRef) return new Error("No doc ref!");

      updateDoc(docRef, { ingredients: action.payload.ingredients });
    },
    deleteRecipeRedux: (state, action) => {
      state.value = state.value.filter(
        (recipe) => recipe.id !== action.payload.id
      );
      const docRef = doc(db, "recipes", action.payload.id);
      if (!docRef) return new Error("No doc ref!");
      deleteDoc(docRef);
    },
    updateHrefRedux: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.href = action.payload.href;
        }
      });
    },

    // clearStateRedux: (state, action) => {
    //   state.value = null;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  //   extraReducers: (builder) => {
  //     // When our request is pending:
  //     // - store the 'pending' state as the status for the corresponding pokemon name
  //     builder.addCase(getRecipes(db).pending, (state, action) => {
  //       state.statusByName[action.meta.arg] = "pending";
  //     });
  //     // When our request is fulfilled:
  //     // - store the 'fulfilled' state as the status for the corresponding pokemon name
  //     // - and store the received payload as the data for the corresponding pokemon name
  //     builder.addCase(getRecipes(db).fulfilled, (state, action) => {
  //       state.statusByName[action.meta.arg] = "fulfilled";
  //       state.dataByName[action.meta.arg] = action.payload;
  //     });
  //     // When our request is rejected:
  //     // - store the 'rejected' state as the status for the corresponding pokemon name
  //     builder.addCase(getRecipes(db).rejected, (state, action) => {
  //       state.statusByName[action.meta.arg] = "rejected";
  //     });
  //   },
});

// Action creators are generated for each case reducer function
export const {
  addRecipeRedux,
  updateInstructionsRedux,
  updateIngredientsRedux,
  deleteRecipeRedux,
  clearStateRedux,
  updateHrefRedux,
} = recipesSlice.actions;

export default recipesSlice.reducer;
