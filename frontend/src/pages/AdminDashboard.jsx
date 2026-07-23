// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useState } from "react";

// =======================================================
// COMPONENT
// =======================================================

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const response = await fetch(
          "https://campusconnect-backend-3hba.onrender.com/api/admin/dashboard"
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

      <div className="text-center mt-20 text-2xl">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-pink-50 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">

        👨‍💼 Admin Dashboard

      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">👥 Users</h2>

          <p className="text-5xl mt-5 font-bold text-pink-600">

            {stats.totalUsers}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">🎉 Events</h2>

          <p className="text-5xl mt-5 font-bold text-blue-600">

            {stats.totalEvents}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">📝 Registrations</h2>

          <p className="text-5xl mt-5 font-bold text-green-600">

            {stats.totalRegistrations}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">💰 Revenue</h2>

          <p className="text-5xl mt-5 font-bold text-yellow-600">

            ₹{stats.totalRevenue}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">

            ✅ Attendance

          </h2>

          <p className="text-5xl mt-5 font-bold text-green-700">

            {stats.attendanceMarked}

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">

            ⏳ Pending

          </h2>

          <p className="text-5xl mt-5 font-bold text-red-600">

            {stats.pendingAttendance}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;