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

  // =======================================================
  // SECTION 3 : STATES
  // =======================================================

  const navigate = useNavigate();

  const [user, setUser] = useState({

    name:"",
    email:"",
    password:"",
    role:"student"

});

  // =======================================================
  // SECTION 4 : HANDLE INPUT
  // =======================================================

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  // =======================================================
  // SECTION 5 : HANDLE REGISTER
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

      if (response.ok) {

        navigate("/login");

      }

    } catch (error) {

      console.error(error);
      alert("Registration Failed");

      toast.error("Registration Failed");

    }

  };

  // =======================================================
  // SECTION 6 : UI
  // =======================================================

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">

          Create Account

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
<select
    name="role"
    value={user.role}
    onChange={handleChange}
    className="w-full border p-3 rounded-lg"
>

    <option value="student">

        Student

    </option>

    <option value="coordinator">

        Event Coordinator

    </option>

</select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >

            Register

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

// =======================================================
// SECTION 7 : EXPORT
// =======================================================

export default Register;