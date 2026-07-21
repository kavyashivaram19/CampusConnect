// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getEventById,
  registerForEvent,
} from "../services/eventService";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function EventDetails() {

  // =======================================================
  // SECTION 3 : STATES
  // =======================================================

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  // =======================================================
  // SECTION 4 : FETCH EVENT
  // =======================================================

  useEffect(() => {

    async function loadEvent() {

      try {

        const data = await getEventById(id);

        setEvent(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadEvent();

  }, [id]);

  // =======================================================
  // SECTION 5 : REGISTER EVENT
  // =======================================================

  async function handleRegister() {

    try {

      setRegistering(true);

      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

  alert("Please login first.");

  return;

}

      if (!user) {

        alert("Please login first.");

        return;

      }

      await registerForEvent(user.id, event._id);

      toast.success("Successfully Registered!");

    } catch (error) {

      toast.error(error.message);

    } finally {

      setRegistering(false);

    }

  }

  // =======================================================
  // SECTION 6 : LOADING
  // =======================================================

  if (loading) {

    return (

      <div className="text-center text-3xl mt-20">
        Loading...
      </div>

    );

  }

  // =======================================================
  // SECTION 7 : EVENT NOT FOUND
  // =======================================================

  if (!event) {

    return (

      <div className="text-center text-3xl mt-20">
        Event Not Found
      </div>

    );

  }

  // =======================================================
  // SECTION 8 : UI
  // =======================================================

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* ===================================================
            SECTION 9 : BANNER IMAGE
        =================================================== */}

        <img
  src={
    event.image
      ? `http://localhost:5000/uploads/${event.image}`
      : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
  }
  alt={event.title}
  className="w-full h-80 object-cover"
/>

        {/* ===================================================
            SECTION 10 : EVENT INFO
        =================================================== */}

        <div className="p-8">

          <Link
            to="/events"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Events
          </Link>

          <h1 className="text-5xl font-bold mt-5">

            {event.title}

          </h1>

          <div className="flex flex-wrap gap-4 mt-6 text-gray-700">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

              {event.category}

            </span>

            <span>

              📅 {event.date}

            </span>

            <span>

              📍 {event.venue}

            </span>

          </div>

          {/* ===================================================
              SECTION 11 : DESCRIPTION
          =================================================== */}

          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-3">

              About this Event

            </h2>

            <p className="text-gray-600 leading-8">

              {event.description}

            </p>

          </div>

          {/* ===================================================
              SECTION 12 : REGISTER BUTTON
          =================================================== */}

          <button
            onClick={handleRegister}
            disabled={registering}
            className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >

            {registering ? "Registering..." : "Register Now"}

          </button>

        </div>

      </div>

    </div>

  );

}

// =======================================================
// SECTION 13 : EXPORT
// =======================================================

export default EventDetails;