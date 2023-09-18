import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //   console.log(resetPassword);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      //   console.log(emailRef.current.value);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <section>
        <h2>Password Reset</h2>
        {error && console.warn({ error })}
        {message && console.warn({ message })}

        <form onSubmit={handleSubmit}>
          <div>
            <h3>Email</h3>
            <input type="email" ref={emailRef} required />
          </div>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </section>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
