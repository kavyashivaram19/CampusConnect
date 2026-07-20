// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/eventService";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function Events() {

  // =======================================================
  // SECTION 3 : STATES
  // =======================================================

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // =======================================================
  // SECTION 4 : FETCH EVENTS
  // =======================================================

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadEvents();
  }, []);

  // =======================================================
  // SECTION 5 : SEARCH & CATEGORY FILTER
  // =======================================================

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  // =======================================================
  // SECTION 6 : UI
  // =======================================================

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* =======================================================
            SECTION 7 : PAGE HEADER
        ======================================================= */}

        <h1 className="text-5xl font-bold text-center">
          All Events
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Discover exciting events happening on campus.
        </p>

        {/* =======================================================
            SECTION 8 : SEARCH BAR
        ======================================================= */}

        <input
          type="text"
          placeholder="Search events..."
          className="w-full mt-8 p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* =======================================================
            SECTION 9 : CATEGORY FILTER
        ======================================================= */}

        <div className="flex flex-wrap gap-3 mt-6 justify-center">

          {["All", "Technical", "Workshop", "Cultural", "Sports"].map(
            (cat) => (

              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full transition ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>

            )
          )}

        </div>

        {/* =======================================================
            SECTION 10 : EVENT GRID
        ======================================================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {filteredEvents.length === 0 ? (

            <div className="col-span-3 text-center text-gray-500 text-xl">
              No events found.
            </div>

          ) : (

            filteredEvents.map((event) => (

              /* ===================================================
                 SECTION 11 : EVENT CARD
              =================================================== */

              <Link
                key={event._id}
                to={`/events/${event._id}`}
              >

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

                  {/* Event Image */}

                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                    alt="Event"
                    className="h-48 w-full object-cover"
                  />

                  {/* Event Details */}

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {event.title}
                    </h2>

                    <p className="text-gray-600 mt-3">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-2 text-gray-700">

                      <p>📅 {event.date}</p>

                      <p>📍 {event.venue}</p>

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {event.category}
                      </span>

                    </div>

                    {/* Register Button */}

                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                      Register Now
                    </button>

                  </div>

                </div>

              </Link>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Events;