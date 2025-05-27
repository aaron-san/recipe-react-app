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
    <main className="min-h-[calc(100vh-150px)]">
      <section>
        <div className="mt-6 text-xl text-center">
          <h2>Log In</h2>
        </div>
        {error && console.warn({ error })}
        <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
          <div className="pr-8 text-right">
            <span className="mr-2">Email:</span>
            <input type="email" ref={emailRef} required autoComplete="email" />
          </div>
          <div className="pr-8 text-right">
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
            className="bg-emerald-400 hover:bg-emerald-400/80 mx-auto px-4 py-2 border border-green rounded-xl w-fit text-white active:scale-[98%]"
          >
            Sign in
          </button>
        </form>
        <div className="text-blue-600 text-center underline">
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
  );
}
