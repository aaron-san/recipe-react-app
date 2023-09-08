import env from "react-dotenv";
// const recipes = require("../data/recipes.json");

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import recipes from "../data/recipes.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// console.log(recipes.recipes);

// Get a list of cities from your database
// async function getRecipes(db) {
//   // const uid = getCurrentUser().uid;
//   const recipesCol = collection(db, "recipes");
//   const recipesSnapshot = await getDocs(recipesCol);
//   const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
//   return recipesList;
// }

// getRecipes(db);

// try {
//   recipes.recipes.forEach(async (obj) => {
//     // console.log(obj);
//     await addDoc(collection(db, "recipes"), {
//       // db.coll("recipes").add({
//       // id: obj.id,
//       title: obj.title,
//       tag: obj.tag,
//       ingredients: obj.ingredients,
//       instructions: obj.instructions,
//       image: obj.image,
//     });
//     console.log("Inserted: ", obj.id);
//   });
//   return;
// } catch (err) {
//   console.log(err);
// }
