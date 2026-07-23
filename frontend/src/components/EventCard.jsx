// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { Link } from "react-router-dom";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function EventCard({ event }) {

  return (

    <Link to={`/events/${event._id}`}>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        {/* ===================================================
            SECTION 3 : EVENT IMAGE
        =================================================== */}

        <div className="relative">

          <img
            src={
              event.image
                ? `http://localhost:5000/uploads/${event.image}`
                : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
            }
            alt={event.title}
            className="w-full h-56 object-cover"
          />

          <span className="absolute top-4 left-4 bg-pink-600 text-white px-4 py-1 rounded-full text-sm shadow">

            {event.category}

          </span>

          <span className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">

            ₹{event.registrationFee}

          </span>

        </div>

        {/* ===================================================
            SECTION 4 : EVENT DETAILS
        =================================================== */}

        <div className="p-6">

          <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">

            {event.title}

          </h2>

          <p className="text-gray-500 mt-3 line-clamp-3">

            {event.description}

          </p>

          {/* ===================================================
              EVENT INFO
          =================================================== */}

          <div className="flex flex-wrap gap-2 mt-5">

            <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm">

              📅 {event.date}

            </span>

            <span className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm">

              📍 {event.venue}

            </span>

          </div>

          {/* ===================================================
              REGISTER BUTTON
          =================================================== */}

          <button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition">

            View Details →

          </button>

        </div>

      </div>

    </Link>

  );

}

export default EventCard;