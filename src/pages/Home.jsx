import React, { useState, useEffect } from "react";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import HeaderText from "../components/HeaderText";
import FormRecipe from "../components/FormRecipe";
import AddNote from "./AddNote";
// import { useParams } from "react-router-dom";
// import { db } from "./config/firestore";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/user/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

function Home() {
  const [addRecipe, setAddRecipe] = useState(false);
  const [addNote, setAddNote] = useState(false);

  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       // user is logged in, send the user's details to redux, store the current user in the state
  //       dispatch(
  //         login({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       dispatch(logout());
  //     }
  //   });
  // }, []);

  // const recipes = useSelector((state) => state.recipes.value);

  return (
    <div className="home-container">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!addRecipe && (
          <>
            <HeaderText />
            <Popular />
          </>
        )}
        <div className="flex justify-center gap-4">
          <FormRecipe
            addRecipe={addRecipe}
            setAddRecipe={setAddRecipe}
            addNote={addNote}
          />

          <AddNote
            addNote={addNote}
            setAddNote={setAddNote}
            addRecipe={addRecipe}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
