// =======================================================
// IMPORTS
// =======================================================

import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

// =======================================================
// COMPONENT
// =======================================================

function Ticket() {

  const navigate = useNavigate();

  const location = useLocation();

  if (!location.state) {

    navigate("/events");

    return null;

  }

  const { registration } = location.state;


  const qrData = JSON.stringify({

    ticketId: registration.ticketId,

    event: registration.eventTitle,

    student: registration.studentName,

    email: registration.studentEmail

});

  return (

    <div className="min-h-screen bg-pink-50 flex justify-center items-center p-10">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[500px]">

        <h1 className="text-4xl font-bold text-center text-pink-600">

          🎟 CampusConnect Ticket

        </h1>

        <hr className="my-6"/>

        <h2 className="text-2xl font-bold">

          {registration.eventTitle}

        </h2>

        <p className="mt-4">

          👤 <strong>Name:</strong>{registration.studentName}

        </p>

        <p>

          📧 <strong>Email:</strong>{registration.studentEmail}

        </p>

        <p>
  📅 <strong>Date:</strong> {registration.eventId?.date || "N/A"}
</p>

<p>
  📍 <strong>Venue:</strong> {registration.eventId?.venue || "N/A"}
</p>

        <p className="mt-4 font-bold text-pink-600">

          Ticket ID : {registration.ticketId}

        </p>

        <div className="flex justify-center mt-8">

          <QRCode

            value={qrData}
            size={180}

          />

        </div>

        <p className="text-center mt-6 text-gray-500">

          Show this QR code at the event entrance.

        </p>

      </div>

    </div>

  );

}

export default Ticket;