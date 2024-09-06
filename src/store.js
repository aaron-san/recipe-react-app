import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "./features/recipes/recipesApi";
import { notesApi } from "./features/notes/notesApi";

export const store = configureStore({
  reducer: {
    // user: userSlice.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    // auth: authReducer,
    // recipes: recipesSlice.reducer,
    // notes: notesSlice.reducer,
    // guessButton: guessButtonSlice.reducer,
    // timer: timerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      recipesApi.middleware,
      notesApi.middleware
    );
  },
});

setupListeners(store.dispatch);
