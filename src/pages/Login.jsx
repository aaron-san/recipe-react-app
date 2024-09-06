import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <main>
        <section>
          <div className="text-xl text-center mt-6">
            <h2>Log In</h2>
          </div>
          {error && console.warn({ error })}
          <form className="max-w-[400px] mx-auto" onSubmit={handleSubmit}>
            <div className="text-right pr-8">
              <span className="mr-2">Email:</span>
              <input
                type="email"
                ref={emailRef}
                required
                autoComplete="email"
              />
            </div>
            <div className="text-right pr-8">
              <span className="mr-2">Password:</span>
              <input
                type="password"
                ref={passwordRef}
                required
                autoComplete="current-password"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600/60 hover:bg-green-600/80 border border-green rounded-md active:scale-[98%] text-white w-fit px-4 py-2 mx-auto"
            >
              Log in
            </button>
          </form>
          <div className="text-center text-blue-600 underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </section>
        <div className="text-center">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </div>
      </main>
    </>
  );
}
