// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Navbar() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // =======================================================
  // SECTION 3 : GET USER
  // =======================================================

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // =======================================================
  // SECTION 4 : LOGOUT
  // =======================================================

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out Successfully");

    navigate("/login");

  }

  // =======================================================
  // SECTION 5 : UI
  // =======================================================

  return (

    <nav className="bg-white/70 backdrop-blur-xl border-b border-pink-100 shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* ===================================================
            SECTION 6 : LOGO
        =================================================== */}

        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
        >
          🎓 CampusConnect
        </Link>

        {/* ===================================================
            SECTION 7 : NAVIGATION LINKS
        =================================================== */}

        <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">

          <Link
            to="/"
            className="hover:text-pink-600 transition"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="hover:text-pink-600 transition"
          >
            Events
          </Link>

          {token && (

  <Link
    to={
      user?.role === "coordinator" || user?.role === "admin"
        ? "/coordinator-dashboard"
        : "/dashboard"
    }
    className="hover:text-pink-600 transition"
  >
    Dashboard
  </Link>

)}
{token && user?.role === "admin" && (

  <Link
    to="/admin-dashboard"
    className="hover:text-pink-600 transition"
  >
    Admin Dashboard
  </Link>

)}

          {token && (

            <Link
              to="/my-registrations"
              className="hover:text-pink-600 transition"
            >
              My Registrations
            </Link>

          )}

          {token &&
  (user?.role === "admin" || user?.role === "coordinator") && (

    <Link
      to="/create-event"
      className="hover:text-pink-600 transition"
    >
      Create Event
    </Link>

)}      </div>

        {/* ===================================================
            SECTION 8 : RIGHT SIDE
        =================================================== */}
{/* ===================================================
    MOBILE MENU BUTTON
=================================================== */}

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-3xl"
>
  {menuOpen ? "✖" : "☰"}
</button>
        <div className="hidden md:flex items-center gap-4">

          {!token ? (

            <>

              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border-2 border-pink-500 text-pink-600 hover:bg-pink-50 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition duration-300 shadow-lg"
              >
                Register
              </Link>

            </>

          ) : (

            <>

              {/* ===================================================
                  USER INFO
              =================================================== */}

              <div className="text-right">

                <p className="font-semibold text-pink-600">

                  {user?.name}

                </p>

                <p className="text-xs text-gray-500 capitalize">

                  {user?.role}

                </p>

              </div>

              {/* ===================================================
                  LOGOUT BUTTON
              =================================================== */}

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                🚪 Logout
              </button>

            </>

          )}

        </div>

      </div>
{menuOpen && (

  <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl">

    <div className="flex flex-col p-5 gap-4">

      <Link to="/" onClick={() => setMenuOpen(false)}>
        Home
      </Link>

      <Link to="/events" onClick={() => setMenuOpen(false)}>
        Events
      </Link>

      {token && (

        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>

      )}

      {token && (

        <Link
          to="/my-registrations"
          onClick={() => setMenuOpen(false)}
        >
          My Registrations
        </Link>

      )}

      {(user?.role === "admin" || user?.role === "coordinator") && (

        <Link
          to="/create-event"
          onClick={() => setMenuOpen(false)}
        >
          Create Event
        </Link>

      )}

      {token && (

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>

      )}

    </div>

  </div>

)}
    </nav>

  );

}

// =======================================================
// SECTION 9 : EXPORT
// =======================================================

export default Navbar;