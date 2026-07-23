// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  // =======================================================
  // HANDLE INPUT
  // =======================================================

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  // =======================================================
  // REGISTER
  // =======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        navigate("/login");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error("Registration Failed");

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

            Create Account ✨

          </h1>

          <p className="text-gray-500 mt-2">

            Join CampusConnect today

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="student">
              🎓 Student
            </option>

            <option value="coordinator">
              👨‍💼 Event Coordinator
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >

            Register

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;