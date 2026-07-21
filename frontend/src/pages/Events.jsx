// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";
import EventCard from "../components/EventCard";

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
    <EventCard
        key={event._id}
        event={event}
    />
      )) 

          )}

        </div>

      </div>

    </div>
  );
}

export default Events;