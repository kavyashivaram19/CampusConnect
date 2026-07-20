import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";

function FeaturedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  async function loadEvents() {
    try {
      const data = await getAllEvents();
      setEvents(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  }

  loadEvents();
}, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Featured Events
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Explore the latest events happening on campus.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {events.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">
              No events available.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <div className="h-40 bg-blue-100 rounded-xl flex items-center justify-center text-5xl">
                  🎉
                </div>

                <h3 className="text-2xl font-bold mt-5">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-gray-700">
                  <p>📅 {event.date}</p>
                  <p>📍 {event.venue}</p>
                  <p>🏷️ {event.category}</p>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Register Now
                </button>
              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturedEvents;