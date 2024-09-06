import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../config/firebase";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
// } from "firebase/auth";

// import {useAuth} from "../../contexts/AuthContext"
// const auth = getAuth();

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authToken: null,
  },
  reducers: {
    saveUser(state, action) {
      state.user = action.payload;
    },
    saveToken(state, action) {
      state.authToken = action.payload;
    },
  },
});

export const { saveUser, saveToken } = authSlice.actions;

// selectors
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
