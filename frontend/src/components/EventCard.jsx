// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { Link } from "react-router-dom";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function EventCard({ event }) {

  return (

    <Link
      to={`/events/${event._id}`}
    >

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

        {/* ===================================================
            SECTION 3 : EVENT IMAGE
        =================================================== */}

        <img
          src={
  event.image
    ? `http://localhost:5000/uploads/${event.image}`
    : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
}
        />

        {/* ===================================================
            SECTION 4 : EVENT DETAILS
        =================================================== */}

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

          {/* ===================================================
              SECTION 5 : REGISTER BUTTON
          =================================================== */}

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            Register Now
          </button>

        </div>

      </div>

    </Link>

  );

}

export default EventCard;