// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// =======================================================
// COMPONENT
// =======================================================
function CoordinatorDashboard() {
  const [events, setEvents] = useState([]);
  const totalEvents = events.length;

const totalRegistrations = events.reduce(

  (sum, event) => sum + event.registrations,

  0

);

const totalRevenue = events.reduce(

  (sum, event) => sum + event.revenue,

  0

);

const totalSeatsLeft = events.reduce(

  (sum, event) => sum + event.seatsLeft,

  0

);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function loadDashboard() {
      try {
        if (!user?.id) return;

        const response = await fetch(
          `http://localhost:5000/api/registrations/coordinator/${user.id}`
        );

        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadDashboard();
  }, [user]);

  async function handleDelete(id) {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this event?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(

      `http://localhost:5000/api/events/delete/${id}`,

      {
        method: "DELETE"
      }

    );

    const data = await response.json();

    if (response.ok) {

      toast.success(data.message);

      setEvents(events.filter(event => event.eventId !== id));

    }

    else {

      toast.error(data.message);

    }

  }

  catch (error) {

    toast.error("Failed to delete event");

  }

}

  return (

  <div className="min-h-screen bg-pink-50 p-10">

    <div className="bg-gradient-to-r from-pink-500 via-pink-500 to-purple-600 rounded-3xl text-white p-10 shadow-2xl mb-10">

  <h1 className="text-4xl font-bold">

    👋 Welcome, {user?.name}

  </h1>

  <p className="mt-3 text-lg text-pink-100">

    Manage your events, registrations and attendance from one place.

  </p>

</div>
    <div className="grid md:grid-cols-4 gap-6 mb-10">

  <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <h2 className="text-gray-500">

      🎉 Total Events

    </h2>

    <p className="text-4xl font-bold text-pink-600 mt-2">

      {totalEvents}

    </p>

  </div>

  <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <h2 className="text-gray-500">

      👥 Registrations

    </h2>

    <p className="text-4xl font-bold text-pink-600 mt-2">

      {totalRegistrations}

    </p>

  </div>

  <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <h2 className="text-gray-500">

      💰 Revenue

    </h2>

    <p className="text-4xl font-bold text-green-600 mt-2">

      ₹{totalRevenue}

    </p>

  </div>

  <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <h2 className="text-gray-500">

      🎟 Seats Left

    </h2>

    <p className="text-4xl font-bold text-orange-600 mt-2">

      {totalSeatsLeft}

    </p>

  </div>

</div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {events.length === 0 ? (

        <div className="col-span-3 text-center">

          <div className="col-span-3 text-center py-20">

  <div className="text-7xl">

    🎉

  </div>

  <h2 className="text-3xl font-bold text-pink-600 mt-4">

    No Events Yet

  </h2>

  <p className="text-gray-500 mt-3">

    Create your first event to get started.

  </p>

</div>

        </div>

      ) : (

        events.map((event) => (

          <div
            key={event.eventId}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300"
          >

            <img
              src={
                event.image
                  ? `http://localhost:5000/uploads/${event.image}`
                  : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
              }
              alt={event.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">

  {event.title}

</h2>

<span className="inline-block mt-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">

  {event.category}

</span>

              <p className="mt-4">
                👥 <strong>Registrations:</strong> {event.registrations}
              </p>

              <p>
                💰 <strong>Revenue:</strong> ₹{event.revenue}
              </p>

              <p>
                🎟 <strong>Seats Left:</strong> {event.seatsLeft}
              </p>
              <div className="mt-4">

  <div className="flex justify-between text-sm mb-2">

    <span>Seats Filled</span>

    <span>

      {event.registrations}/{event.maxParticipants}

    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">

    <div
      className="bg-pink-500 h-3 rounded-full"
      style={{
  width: `${
    event.maxParticipants > 0
      ? (event.registrations / event.maxParticipants) * 100
      : 0
  }%`
}}
    ></div>

  </div>

</div>

              <p>
  💵 <strong>Registration Fee:</strong> ₹{event.registrationFee}
</p>

<p className="break-all mt-2">
  📧 <strong>Coordinator:</strong> {event.coordinatorEmail}
</p>

<div className="mt-6 flex flex-col gap-3">

  <Link
    to={`/participants/${event.eventId}`}
    className="w-full bg-pink-600 text-white text-center py-3 rounded-xl hover:bg-pink-700 transition"
  >
    👥 View Participants
  </Link>
<Link
  to="/scan-attendance"
  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-3 rounded-xl hover:scale-105 transition"
>
  📷 Scan QR
</Link>
  <Link
    to={`/edit-event/${event.eventId}`}
    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-3 rounded-xl hover:scale-105 transition duration-300"
  >
    ✏️ Edit Event
  </Link>
  <button
  onClick={() => handleDelete(event.eventId)}
  className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
>
  🗑 Delete Event
</button>

</div>

            </div>

          </div>

        ))

      )}

    </div>

  </div>

);
}

export default CoordinatorDashboard;