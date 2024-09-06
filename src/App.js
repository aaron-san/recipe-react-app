import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/user/slices/userSlice";
import { auth, onAuthStateChanged } from "./config/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  // useEffect(() => {
  //   const getRecipes = async (db) => {
  //     const recipesRef = collection(db, "recipes");
  //     const recipesSnapshot = await getDocs(recipesRef);
  //     const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
  //     // Add the firestore recipes to the redux store
  //     // recipesList.forEach((recipe) => console.log(recipe));

  //     // recipesList.map((recipe) => {
  //     //   const docRef = doc(db, "recipes", recipe.id);
  //     //   if (!docRef) return new Error("No doc ref!");
  //     //   updateDoc(docRef, { ingredients: recipe.ingredients.split(";") });
  //     //   return null;
  //     // });

  //     recipesList.forEach((recipe) => dispatch(addRecipeRedux(recipe)));
  //     // console.log(recipesList);
  //   };

  //   getRecipes(db);

  //   const getNotes = async (db) => {
  //     const notesRef = collection(db, "notes");
  //     const notesSnapshot = await getDocs(notesRef);
  //     const notesList = notesSnapshot.docs.map((doc) => doc.data());
  //     // Add the firestore recipes to the redux store
  //     // notesList.forEach((note) => dispatch(addNoteRedux(note)));
  //     notesList.forEach((note) => dispatch(addNoteRedux(note)));
  //   };

  //   getNotes(db);
  // }, [dispatch]);

  // const location = useLocation();
  return (
    <div className="App">
      <div className="flex flex-col justify-between min-h-screen ">App</div>
    </div>
  );
}

export default App;
