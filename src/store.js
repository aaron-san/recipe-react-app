import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Import reducers
import recipesReducer from "./features/recipes/recipesSlice";
// import counterReducer from '../features/counter/counterSlice'

const rootReducer = combineReducers({
  //   users: usersReducer,
  //   posts: postsReducer,
  //   comments: commentsReducer,
  //   form: formReducer,
  recipes: recipesReducer,
});

export const store = configureStore({ reducer: rootReducer });
