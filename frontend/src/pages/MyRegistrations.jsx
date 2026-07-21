// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { getMyRegistrations } from "../services/eventService";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function MyRegistrations() {

  // =======================================================
  // SECTION 3 : STATES
  // =======================================================

  const [registrations, setRegistrations] = useState([]);

  // =======================================================
  // SECTION 4 : FETCH DATA
  // =======================================================

  useEffect(() => {

    async function loadRegistrations() {

      try {

        const data = await getMyRegistrations(
          "6a5e2cb627608efe04f4dc0c"
        );

        setRegistrations(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadRegistrations();

  }, []);

  // =======================================================
  // SECTION 5 : UI
  // =======================================================

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Registrations
        </h1>

        {
          registrations.map((registration) => (

            <div
              key={registration._id}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >

              <h2 className="text-2xl font-bold">
                {registration.eventId.title}
              </h2>

              <p className="mt-3">
                📅 {registration.eventId.date}
              </p>

              <p>
                📍 {registration.eventId.venue}
              </p>

              <span className="inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Registered
              </span>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default MyRegistrations;