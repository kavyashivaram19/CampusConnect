// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Navbar() {

  const navigate = useNavigate();

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

    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* ===================================================
            SECTION 6 : LOGO
        =================================================== */}

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          CampusConnect
        </Link>

        {/* ===================================================
            SECTION 7 : NAVIGATION LINKS
        =================================================== */}

        <div className="flex gap-8 text-gray-700 font-medium items-center">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="hover:text-blue-600 transition"
          >
            Events
          </Link>

          {token && (

            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>

          )}

          {token && (

            <Link
              to="/my-registrations"
              className="hover:text-blue-600 transition"
            >
              My Registrations
            </Link>

          )}

          {token && user?.role === "admin" && (

            <Link
              to="/create-event"
              className="hover:text-blue-600 transition"
            >
              Create Event
            </Link>

          )}

        </div>

        {/* ===================================================
            SECTION 8 : RIGHT SIDE
        =================================================== */}

        <div className="flex items-center gap-4">

          {!token ? (

            <>

              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
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

                <p className="font-semibold text-blue-600">

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

    </nav>

  );

}

// =======================================================
// SECTION 9 : EXPORT
// =======================================================

export default Navbar;