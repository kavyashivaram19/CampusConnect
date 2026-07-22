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

        try {

          scanner.clear();

          const qrData = JSON.parse(decodedText);

          console.log(qrData);

          toast.success("QR Scanned Successfully");

          // Backend API will be added next

        }

        catch (error) {

          toast.error("Invalid QR Code");

        }

      },

      () => {}

    );

    return () => {

      scanner.clear().catch(() => {});

    };

  }, []);

  return (

    <div className="min-h-screen bg-pink-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">

          📷 Scan Attendance

        </h1>

        <div id="reader"></div>

      </div>

    </div>

  );

}

export default ScanAttendance;