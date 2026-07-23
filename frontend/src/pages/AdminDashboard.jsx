// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useState } from "react";

// =======================================================
// COMPONENT
// =======================================================

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    async function loadDashboard() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard"
        );

        const data = await response.json();

        setStats(data);

      }

      catch (error) {

        console.log(error);

      }

    }

    loadDashboard();

  }, []);

  if (!stats) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 via-white to-purple-50">

        <h2 className="text-3xl font-bold text-pink-600">

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-10">

      {/* =======================================================
          WELCOME CARD
      ======================================================= */}

      <div className="bg-gradient-to-r from-pink-500 via-pink-500 to-purple-600 rounded-3xl text-white p-10 shadow-2xl mb-10">

        <h1 className="text-4xl font-bold">

          👑 Welcome, {user?.name}

        </h1>

        <p className="mt-3 text-lg text-pink-100">

          Monitor users, events, registrations and platform analytics.

        </p>

      </div>

      {/* =======================================================
          STATISTICS
      ======================================================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            👥 Users

          </h2>

          <p className="text-5xl mt-5 font-bold text-pink-600">

            {stats.totalUsers}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            🎉 Events

          </h2>

          <p className="text-5xl mt-5 font-bold text-purple-600">

            {stats.totalEvents}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            📝 Registrations

          </h2>

          <p className="text-5xl mt-5 font-bold text-pink-500">

            {stats.totalRegistrations}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            💰 Revenue

          </h2>

          <p className="text-5xl mt-5 font-bold text-purple-500">

            ₹{stats.totalRevenue}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            ✅ Attendance

          </h2>

          <p className="text-5xl mt-5 font-bold text-pink-600">

            {stats.attendanceMarked}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

          <h2 className="text-2xl font-bold">

            ⏳ Pending

          </h2>

          <p className="text-5xl mt-5 font-bold text-red-500">

            {stats.pendingAttendance}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;