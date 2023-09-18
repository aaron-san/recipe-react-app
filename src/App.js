import { useEffect, useContext } from "react";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/Hero";

// import "@splidejs/react-splide/css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";
// import Search from "./components/Search";
import { addRecipe } from "./features/recipes/recipesSlice";

import Home from "./pages/Home";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import Cuisine from "./pages/Cuisine";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";

import { AnimatePresence } from "framer-motion";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";
function App() {
  const currentUser = useContext(AuthProvider);
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

  // const location = useLocation();
  return (
    <div className="App">
      <div className="flex flex-col justify-between min-h-screen ">
        <Router>
          <AuthProvider>
            <Hero />
            {/* <AnimatePresence> */}
            {/* {console.log(currentUser)} */}
            {/* <Routes location={location} key={location.pathname}> */}
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
              <Route path="/searched/:search" element={<Searched />} />
              <Route path="/recipe/:name" element={<Recipe />} />
            </Routes>
            {/* </AnimatePresence> */}
            {/* <Search />*/}
            {/* <AppBar /> */}
            <Footer />
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
