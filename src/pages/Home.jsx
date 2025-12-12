import React, { useState, useEffect } from "react";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import FormRecipe from "../components/FormRecipe";
import AddNote from "./AddNote";
// import { useParams } from "react-router-dom";
// import { db } from "./config/firestore";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/user/slices/userSlice";

function Home() {
  const [addRecipe, setAddRecipe] = useState(false);
  const [addNote, setAddNote] = useState(false);

  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

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
    <div className="bg-gradient-to-b from-amber-200 to-amber-100 min-h-[calc(100vh-120px)]">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!addRecipe && (
          <>
            <div className="flex flex-col justify-center items-center mx-auto mt-8 max-w-[280px] header-text">
              {/* <div className="mt-16 text-amber-900 text-2xl">
                Fast Recipes
              </div>
              <div className="text-cyan-900 text-base">
                from the Midwest
              </div> */}
            </div>
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
