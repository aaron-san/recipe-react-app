import { db } from "../../config/firebase";
import {
  // arrayUnion,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  // arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
// import { useAuth } from "../../contexts/AuthContext";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// import { auth } from "../";

export const recipesApi = createApi({
  reducerPath: "recipes",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    fetchRecipes: builder.query({
      async queryFn() {
        try {
          const recipesRef = collection(db, "recipes");
          const querySnapshot = await getDocs(recipesRef);
          let recipes = [];
          querySnapshot?.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
          });
          return { data: recipes };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Recipes"],
    }),
    fetchRecipe: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "recipes", id);
          const snapShot = await getDoc(docRef);
          return { data: snapShot.data() };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Recipes"],
    }),
    // addRecipe: builder.mutation({
    //   async queryFn({ newRecipe }) {
    //     try {
    //       await addDoc(collection(db, "recipes"), {
    //         ...newRecipe,
    //         timeStamp: serverTimestamp(),
    //       });
    //       return { data: "ok" };
    //     } catch (error) {
    //       console.error(error.message);
    //       return { error: error.message };
    //     }
    //   },
    //   invalidatesTags: ["Recipes"],
    // }),
    // deleteRecipe: builder.mutation({
    //   async queryFun(id) {
    //     try {
    //       await deleteDoc(doc(db, "recipes", id));
    //       return { data: "ok" };
    //     } catch (err) {
    //       console.log(err.message);
    //       return { error: err.message };
    //     }
    //   },
    //   invalidatesTags: ["Recipes"],
    // }),
    // updateRecipe: builder.mutation({
    //   async queryFn({ id, data }) {
    //     try {
    //       const docRef = doc(db, "recipes", id);
    //       await updateDoc(docRef, {
    //         ...data,
    //         timestamp: serverTimestamp(),
    //       });
    //       return { data: "ok" };
    //     } catch (err) {
    //       console.log(err.message);
    //       return { error: err.message };
    //     }
    //   },
    //   invalidatesTags: ["Recipes"],
    // }),
    updateIngredients: builder.mutation({
      queryFn: async ({ recipeId, newIngredients }) => {
        try {
          const docRef = doc(db, "recipes", recipeId);
          if (!docRef) return new Error("No doc ref!");

          await updateDoc(docRef, {
            ingredients: newIngredients,
          });
          // await updateDoc(docRef, {
          //   recipe,
          // });

          return { data: null };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Recipes"],
    }),
    updateTitle: builder.mutation({
      queryFn: async ({ recipeId, newTitle }) => {
        try {
          const docRef = doc(db, "recipes", recipeId);
          if (!docRef) return new Error("No doc ref!");

          await updateDoc(docRef, {
            title: newTitle,
          });

          return { data: null };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useFetchRecipesQuery,
  useFetchRecipeQuery,
  // useAddRecipeMutation,
  // useDeleteRecipeMutation,
  // useAddIngredientMutation,
  useUpdateIngredientsMutation,
  useUpdateTitleMutation,
} = recipesApi;

// export const recipesSlice = createSlice({
//   name: "recipes",
//   initialState: {
//     // Set initial value to nothing. Import data from Firestore and add it later
//     value: [],
//     // value: [
//     //   {
//     //     id: "",
//     //     title: "",
//     //     tage: "",
//     //     ingredients: "",
//     //     instructions: "",
//     //     image: "",
//     //   },
//     // ],
//   },
//   reducers: {
//     addRecipeRedux(state, action) {
//       state.value.unshift(action.payload);
//     },
//     // updateInstructionsRedux: (state, action) => {
//     //   // if (!action.payload.instructions) return;
//     //   state.value.forEach((item) => {
//     //     if (item.id === action.payload.id) {
//     //       item.instructions[action.payload.id] = action.payload.ingredient;
//     //     }
//     //   });
//     //   // const docRef = doc(db, "recipes", action.payload.id);
//     //   // if (!docRef) return new Error("No doc ref!");
//     //   // updateDoc(docRef, { instructions: action.payload.instructions });
//     // },
//     updateIngredientsRedux(state, action) {
//       if (!action.payload) return;

//       const { ingredient, recipe, ingredientItemId } = action.payload;

//       // console.log(action.payload.recipe.id);
//       const docRef = doc(db, "recipes", recipe.id);
//       if (!docRef) return new Error("No doc ref!");

//       const updatedIngredients = [
//         ...recipe.ingredients.slice(0, ingredientItemId),
//         ingredient,
//         ...recipe.ingredients.slice(
//           ingredientItemId + 1,
//           recipe.ingredients.length
//         ),
//       ];
//       updateDoc(docRef, { ingredients: updatedIngredients });

//       return state.value.map((item) => {
//         if (item.id === recipe.id) {
//           item.ingredients[ingredientItemId] = ingredient;
//         }
//       });
//     },
//     deleteRecipeRedux(state, action) {
//       state.value = state.value.filter(
//         (recipe) => recipe.id !== action.payload.id
//       );
//       const docRef = doc(db, "recipes", action.payload.id);
//       if (!docRef) return new Error("No doc ref!");
//       deleteDoc(docRef);
//     },
//     updateHrefRedux(state, action) {
//       state.value.forEach((item) => {
//         if (item.id === action.payload.id) {
//           item.image = action.payload.href;
//         }
//       });
//       if (!action.payload) return;
//       const docRef = doc(db, "recipes", action.payload.id);
//       updateDoc(docRef, { image: action.payload.href });
//     },

//     // clearStateRedux: (state, action) => {
//     //   state.value = null;
//     // },
//     // incrementByAmount: (state, action) => {
//     //   state.value += action.payload;
//     // },
//   },
//   //   extraReducers: (builder) => {
//   //     // When our request is pending:
//   //     // - store the 'pending' state as the status for the corresponding pokemon name
//   //     builder.addCase(getRecipes(db).pending, (state, action) => {
//   //       state.statusByName[action.meta.arg] = "pending";
//   //     });
//   //     // When our request is fulfilled:
//   //     // - store the 'fulfilled' state as the status for the corresponding pokemon name
//   //     // - and store the received payload as the data for the corresponding pokemon name
//   //     builder.addCase(getRecipes(db).fulfilled, (state, action) => {
//   //       state.statusByName[action.meta.arg] = "fulfilled";
//   //       state.dataByName[action.meta.arg] = action.payload;
//   //     });
//   //     // When our request is rejected:
//   //     // - store the 'rejected' state as the status for the corresponding pokemon name
//   //     builder.addCase(getRecipes(db).rejected, (state, action) => {
//   //       state.statusByName[action.meta.arg] = "rejected";
//   //     });
//   //   },
// });

// // Action creators are generated for each case reducer function
// export const {
//   addRecipeRedux,
//   updateInstructionsRedux,
//   updateIngredientsRedux,
//   deleteRecipeRedux,
//   clearStateRedux,
//   updateHrefRedux,
// } = recipesSlice.actions;

// export default recipesSlice.reducer;
