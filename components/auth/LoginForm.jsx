"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store";

const LoginForm = () => {
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setFormError("");

    try {
      const formData = new FormData(event.currentTarget);
      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const resultAction = await dispatch(loginUser(credentials)).unwrap();

      // If we reach here, login was successful
      if (resultAction && resultAction.id) {
        router.push("/");
      } else {
        setFormError("Login failed");
      }
    } catch (err) {
      // Handle Redux toolkit errors
      setFormError(err.message || "Login failed. Please try again.");
    }
  }

  const displayError = formError || error;

  return (
    <>
      {displayError && (
        <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded-md text-red-400">
          <strong>Login Error:</strong> {displayError}
        </div>
      )}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-indigo-600 btn-primary hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
