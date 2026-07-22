// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// =======================================================
// COMPONENT
// =======================================================

function Participants() {

    const { eventId } = useParams();

    const [participants, setParticipants] = useState([]);

    useEffect(() => {

        async function loadParticipants() {

            const response = await fetch(
                `http://localhost:5000/api/registrations/participants/${eventId}`
            );

            const data = await response.json();

            setParticipants(data);

        }

        loadParticipants();

    }, [eventId]);

    return (

        <div className="min-h-screen bg-pink-50 p-10">

            <h1 className="text-4xl font-bold mb-8">

                Event Participants

            </h1>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-pink-500 text-white">

                        <tr>

                            <th className="p-4">Student</th>

                            <th className="p-4">Email</th>

                            <th className="p-4">Payment</th>

                            <th className="p-4">Registration Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {participants.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center p-8"
                                >

                                    No registrations yet.

                                </td>

                            </tr>

                        ) : (

                            participants.map((student) => (

                                <tr
                                    key={student._id}
                                    className="border-b hover:bg-pink-50"
                                >

                                    <td className="p-4">

                                        {student.studentName}

                                    </td>

                                    <td className="p-4">

                                        {student.studentEmail}

                                    </td>

                                    <td className="p-4 text-green-600 font-bold">

                                        {student.paymentStatus}

                                    </td>

                                    <td className="p-4">

                                        {new Date(
                                            student.registrationDate
                                        ).toLocaleDateString()}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Participants;