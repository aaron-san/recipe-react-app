import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/Hero";

// import "@splidejs/react-splide/css";
import {
  BrowserRouter,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import Cuisine from "./pages/Cuisine";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";

// import { AnimatePresence } from "framer-motion";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";
import AddNote from "./pages/AddNote";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Hero />
          {/* <AnimatePresence> */}
          {/* {console.log(currentUser)} */}
          {/* <Routes location={location} key={location.pathname}> */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/addnote" element={<AddNote />} />
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
          </Routes>
          {/* </AnimatePresence> */}
          {/* <Search />*/}
          {/* <AppBar /> */}
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
