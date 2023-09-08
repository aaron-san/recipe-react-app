import { db } from "./firestore.js";
import { collection, getDocs } from "firebase/firestore";

// const recipesRef = collection(db, "recipes");

// Get a list of cities from your database
// async function getRecipes(db) {
//   // const uid = getCurrentUser().uid;
//   const recipesSnapshot = await getDocs(collection(db, "recipes"));
//   const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
//   console.log(recipesList);
//   return recipesList;
// }

// getRecipes(db);
