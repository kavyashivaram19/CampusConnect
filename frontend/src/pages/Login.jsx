// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // =======================================================
  // HANDLE INPUT
  // =======================================================

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // =======================================================
  // LOGIN
  // =======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://campusconnect-backend-3hba.onrender.com/api/auth/login",
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

        localStorage.setItem("token", data.token);

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

      toast.error("Something went wrong.");

    }

  };

  // =======================================================
  // UI
  // =======================================================

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 p-6">

      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-pink-100">

        <div className="text-center">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">

            Welcome Back 👋

          </h1>

          <p className="text-gray-500 mt-2">

            Login to your CampusConnect account

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >

            Login

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-pink-600 font-semibold hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;