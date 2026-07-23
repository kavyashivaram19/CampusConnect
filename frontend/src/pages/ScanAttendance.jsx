// =======================================================
// IMPORTS
// =======================================================

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";

// =======================================================
// COMPONENT
// =======================================================

function ScanAttendance() {

  useEffect(() => {

    let scanning = false;

    const scanner = new Html5QrcodeScanner(

      "reader",

      {
        fps: 10,
        qrbox: 250
      },

      false

    );

    scanner.render(

      async (decodedText) => {

        if (scanning) return;

        scanning = true;

        try {

          const qrData = JSON.parse(decodedText);

          console.log("QR Data :", qrData);

          const response = await fetch(

            "http://localhost:5000/api/registrations/attendance",

            {

              method: "POST",

              headers: {

                "Content-Type": "application/json"

              },

              body: JSON.stringify({

                ticketId: qrData.ticketId

              })

            }

          );

          const data = await response.json();

          if (response.ok) {

            toast.success(data.message);

          }

          else {

            toast.error(data.message);

          }

        }

        catch (error) {

          console.log(error);

          toast.error("Invalid QR Code");

        }

        // Allow next scan after 2 seconds
        setTimeout(() => {

          scanning = false;

        }, 2000);

      },

      (error) => {
        // Ignore scan errors while camera is searching
      }

    );

    return () => {

      scanner.clear().catch(() => {});

    };

  }, []);

  return (

    <div className="min-h-screen bg-pink-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">

          📷 Scan Attendance

        </h1>

        <div id="reader"></div>

        <p className="text-center mt-6 text-gray-500">

          Scan the student's QR Ticket

        </p>

      </div>

    </div>

  );

}

// =======================================================
// EXPORT
// =======================================================

export default ScanAttendance;