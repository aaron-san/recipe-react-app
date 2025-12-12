import React, {
  useContext,
  useState,
  useEffect,
  Suspense,
  createContext,
} from "react";
import { auth } from "../config/firebase";
import {
  // getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, saveToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const user = useSelector((state) => state.auth.user);
  // let user = auth.currentUser;

  // console.log(auth, auth.currentUser);
  const [user, setUser] = useState(auth.currentUser);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);
  // const auth = getAuth();

  function signup(email, password) {
    // console.log("Auth: " + auth);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // const checkEmailVerified = (userCredential) => {
  //   if (!userCredential.user.emailVerified) {
  //     console.error("User email is not verified.");
  //     // toast.error("Please verify your email address to continue.");
  //   } else {
  //     // dispatch(saveUser(userCredential.user));
  //     // dispatch(saveToken(userCredential.user.accessToken));
  //     // navigate("/");
  //   }
  // };

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );

      // return checkEmailVerified(userCredential);
    } catch (err) {
      console.error(err.message);
      // toast.error(err.message);
    } finally {
      // setLoading(false);
    }
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return user.updateEmail(email);
  }

  function updatePassword(password) {
    return user.updatePassword(password);
  }

  useEffect(() => {
    // user && logout();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // console.log(user?.uid, user?.email);
      setUser(authUser);
      // setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // check at page load if a user is authenticated
  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       // User is logged in, send the user's details to redux, store the current user in the state
  //       // login(auth, email, password);
  //       // console.log(userAuth.email);
  //       // console.log(userAuth);

  //       dispatch(saveUser(userAuth.uid));
  //       dispatch(saveToken(userAuth.accessToken));

  //       // console.log("Logged in");
  //       // dispatch(
  //       //   login({
  //       //     email: userAuth.email,
  //       //     uid: userAuth.uid,
  //       //     displayName: userAuth.displayName,
  //       //     photoUrl: userAuth.photoURL,
  //       //   })
  //       // );
  //       return;
  //     } else {
  //       // dispatch(logout());
  //     }
  //   });
  // }, []);

  // const authTok = useSelector((state) => state.auth.authToken);
  // console.log(authTok);

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      <Suspense fallback={null}>
        {/* {!loading && children} */}
        {children}
      </Suspense>
    </AuthContext.Provider>
  );
}
