// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Login() {

  // =======================================================
  // SECTION 3 : STATES
  // =======================================================

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // =======================================================
  // SECTION 4 : HANDLE INPUT CHANGE
  // =======================================================

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  // =======================================================
  // SECTION 5 : HANDLE LOGIN
  // =======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.token) {

        // Save JWT Token
        localStorage.setItem("token", data.token);

        // Save Logged In User
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        toast.success("Login Successful!");

        navigate("/dashboard");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.error(error);
      toast.error("Something went wrong.");

    }

  };

  // =======================================================
  // SECTION 6 : UI
  // =======================================================

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}

// =======================================================
// SECTION 7 : EXPORT
// =======================================================

export default Login;