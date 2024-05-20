import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="w-full h-3 border-b rounded-full border-slate-300"></div>
      <div className="mb-8">
        Please{" "}
        <Link to="/login" className="text-blue-500 underline">
          Sign in
        </Link>{" "}
        or{" "}
        <Link to="/signup" className="text-blue-500 underline">
          Register
        </Link>{" "}
        to add or edit a recipe.
      </div>
    </>
  );
};

export default SignIn;
