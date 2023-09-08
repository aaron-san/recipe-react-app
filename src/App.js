import { useEffect } from "react";
import { db } from "./config/firestore";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import Pages from "./pages/Pages";
import Hero from "./components/Hero";
// import "@splidejs/react-splide/css";
import { BrowserRouter } from "react-router-dom";
// import Search from "./components/Search";
import { addRecipe } from "./features/recipes/recipesSlice";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getRecipes = async (db) => {
      const recipesSnapshot = await getDocs(collection(db, "recipes"));
      // console.log(recipesSnapshot);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      // Add the firestore recipes to the redux store
      recipesList.forEach((recipe) => dispatch(addRecipe(recipe)));
      // setRecipes(recipesList);
    };
    getRecipes(db);
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex flex-col justify-between min-h-screen ">
          {/* <Search />*/}
          {/* <AppBar /> */}
          <div>
            <Hero />
            <Pages />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
