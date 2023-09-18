import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <section>
        <div>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && console.warn({ error })}
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Email</h2>
              <input type="email" ref={emailRef} required />
            </div>
            <div>
              <h2>Password</h2>
              <input type="password" ref={passwordRef} required />
            </div>
            <div>
              <h2>Password Confirmation</h2>
              <input type="password" ref={passwordConfirmRef} required />
            </div>
            <button disabled={loading} type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </section>
    </>
  );
}
