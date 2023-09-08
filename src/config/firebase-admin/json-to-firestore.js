require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

// import recipes from "../data/recipes.json";
// import fire

// console.log(recipes);
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const recipes = require("../../data/recipes.json");
const {
  doc,
  addDoc,
  setDoc,
  collection,
  getFirestore,
  getCurrentUser,
  getDocs,
} = require("firebase/firestore");

// import {
//   doc,
//   addDoc,
//   collection,
//   getFirestore,
//   getCurrentUser,
//   getDocs,
// } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import recipes from "../data/recipes.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD5ZGNEJ3jlDLKmr6Ajeekr4BCS52BbWcY",
//   authDomain: "recipe-react-app-ad1cc.firebaseapp.com",
//   projectId: "recipe-react-app-ad1cc",
//   storageBucket: "recipe-react-app-ad1cc.appspot.com",
//   messagingSenderId: "399401014732",
//   appId: "1:399401014732:web:36cd5959d9bb1e4b9ef969",
// };

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// console.log(recipes.recipes);

// const recipesRef = collection(db, "recipes", );

// Get a list of cities from your database
// async function getRecipes(db) {
//   // const uid = getCurrentUser().uid;
//   const recipesCol = collection(db, "recipes");
//   const recipesSnapshot = await getDocs(recipesCol);
//   const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
//   console.table(recipesList);
//   return recipesList;
// }

// getRecipes(db);

try {
  recipes.recipes.forEach(async (obj) => {
    // console.log(obj);
    const recipeId = uuidv4();
    const recipesRef = collection(db, "recipes");
    // await addDoc(collection(db, "recipes"), {
    await setDoc(doc(recipesRef, recipeId), {
      // db.coll("recipes").add({
      id: recipeId,
      title: obj.title,
      tag: obj.tag,
      ingredients: obj.ingredients,
      instructions: obj.instructions,
      image: obj.image,
    });
    console.log("Inserted: ", obj.id);
  });
} catch (err) {
  console.log(err);
}

// import { doc, updateDoc, deleteField } from "firebase/firestore";

// const cityRef = doc(db, 'cities', 'BJ');

// // Remove the 'capital' field from the document
// await updateDoc(cityRef, {
//     capital: deleteField()
// });
