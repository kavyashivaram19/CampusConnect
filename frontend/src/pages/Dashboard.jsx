// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/eventService";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Dashboard() {

  // =======================================================
  // SECTION 3 : GET USER
  // =======================================================

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    registeredEvents: 0,
  });

  // =======================================================
  // SECTION 4 : LOAD DASHBOARD STATS
  // =======================================================

  useEffect(() => {

    async function loadStats() {

      try {

        const data = await getDashboardStats(user.id);

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    }

    if (user) {

      loadStats();

    }

  }, []);

  // =======================================================
  // SECTION 5 : UI
  // =======================================================

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* ===================================================
          SECTION 6 : WELCOME
      =================================================== */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white p-10 shadow-xl">

        <h1 className="text-4xl font-bold">

          Welcome, {user?.name} 👋

        </h1>

        <p className="mt-3 text-lg">

          Manage your campus events from one place.

        </p>

      </div>

      {/* ===================================================
          SECTION 7 : STATISTICS
      =================================================== */}

      <div className="grid md:grid-cols-3 gap-8 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-5xl mb-3">
            🎟
          </h2>

          <h3 className="text-2xl font-bold">
            Registered Events
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">

            {stats.registeredEvents}

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-5xl mb-3">
            📅
          </h2>

          <h3 className="text-2xl font-bold">
            Upcoming Events
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">

            Coming Soon

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-5xl mb-3">
            🎓
          </h2>

          <h3 className="text-2xl font-bold">
            Role
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-3">

            {user?.role}

          </p>

        </div>

      </div>

      {/* ===================================================
          SECTION 8 : QUICK ACTIONS
      =================================================== */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">

          Quick Actions

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/events"
            className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg hover:bg-blue-700 transition"
          >

            <h2 className="text-2xl font-bold">

              Browse Events

            </h2>

            <p className="mt-3">

              Explore all campus events.

            </p>

          </Link>

          <Link
            to="/my-registrations"
            className="bg-green-600 text-white p-8 rounded-2xl shadow-lg hover:bg-green-700 transition"
          >

            <h2 className="text-2xl font-bold">

              My Registrations

            </h2>

            <p className="mt-3">

              View all registered events.

            </p>

          </Link>

        </div>

      </div>

    </div>

  );

}

// =======================================================
// SECTION 9 : EXPORT
// =======================================================

export default Dashboard;