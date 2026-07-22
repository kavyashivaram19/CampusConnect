import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Payment() {

  const navigate = useNavigate();

  const location = useLocation();

if (!location.state) {

  navigate("/events");

  return null;

}

const { event, user } = location.state;

  async function handlePayment() {

    try {

      const response = await fetch(

        "http://localhost:5000/api/registrations/register",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            userId: user.id,

            eventId: event._id

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        toast.success("Payment Successful 🎉");

navigate("/ticket", {

  state: {

    event,

    user

  }

});

      }

      else {

        toast.error(data.message);

      }

    }

    catch {

      toast.error("Payment Failed");

    }

  }

  return (

    <div className="min-h-screen bg-pink-50 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-8">

          Payment

        </h1>

        <h2 className="text-xl font-semibold">

          {event.title}

        </h2>

        <p className="mt-4">

          Amount : ₹{event.registrationFee}

        </p>

        <select className="w-full border p-3 rounded-xl mt-6">

          <option>UPI</option>

          <option>Card</option>

          <option>Net Banking</option>

          <option>Cash</option>

        </select>

        <button

          onClick={handlePayment}

          className="w-full bg-pink-600 text-white py-3 rounded-xl mt-8 hover:bg-pink-700"

        >

          Pay ₹{event.registrationFee}

        </button>

      </div>

    </div>

  );

}

export default Payment;