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

    <h1 className="text-4xl font-bold mb-10 text-center">
      Coordinator Dashboard
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {events.length === 0 ? (

        <div className="col-span-3 text-center">

          <h2 className="text-2xl text-gray-600">
            No events found.
          </h2>

        </div>

      ) : (

        events.map((event) => (

          <div
            key={event.eventId}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
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

              <p className="mt-4">
                👥 <strong>Registrations:</strong> {event.registrations}
              </p>

              <p>
                💰 <strong>Revenue:</strong> ₹{event.revenue}
              </p>

              <p>
                🎟 <strong>Seats Left:</strong> {event.seatsLeft}
              </p>

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
  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 ml-3"
>
  📷 Scan QR
</Link>
  <Link
    to={`/edit-event/${event.eventId}`}
    className="w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition"
  >
    ✏️ Edit Event
  </Link>
  <button
  onClick={() => handleDelete(event.eventId)}
  className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
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