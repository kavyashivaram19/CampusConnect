// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function EditEvent() {

  const { id } = useParams();

  const navigate = useNavigate();

  // =======================================================
  // SECTION 3 : STATE
  // =======================================================

  const [event, setEvent] = useState({

  title: "",
  description: "",
  category: "",
  date: "",
  venue: "",
  registrationFee: "",
  maxParticipants: "",
  coordinatorName: "",
  coordinatorEmail: "",
  image: null

});

  const [preview, setPreview] = useState("");

  // =======================================================
  // SECTION 4 : LOAD EVENT
  // =======================================================

  useEffect(() => {

    async function loadEvent() {

      try {

        const response = await fetch(

          `https://campusconnect-backend-3hba.onrender.com/api/events/${id}`

        );

        const data = await response.json();

        setEvent({

  title: data.title,
  description: data.description,
  category: data.category,
  date: data.date,
  venue: data.venue,
  registrationFee: data.registrationFee,
  maxParticipants: data.maxParticipants,
  coordinatorName: data.coordinatorName,
  coordinatorEmail: data.coordinatorEmail,
  image: null

});

        if (data.image) {

          setPreview(

            `https://campusconnect-backend-3hba.onrender.com/uploads/${data.image}`

          );

        }

      }

      catch (error) {

        toast.error("Failed to load event");

      }

    }

    loadEvent();

  }, [id]);

  // =======================================================
  // SECTION 5 : HANDLE CHANGE
  // =======================================================

  function handleChange(e) {

    if (e.target.name === "image") {

      setEvent({

        ...event,
        image: e.target.files[0]

      });

      setPreview(

        URL.createObjectURL(e.target.files[0])

      );

    }

    else {

      setEvent({

        ...event,
        [e.target.name]: e.target.value

      });

    }

  }

  // =======================================================
  // SECTION 6 : UPDATE EVENT
  // =======================================================

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", event.title);
      formData.append("description", event.description);
      formData.append("category", event.category);
      formData.append("date", event.date);
      formData.append("venue", event.venue);
      formData.append("registrationFee",event.registrationFee );
      formData.append("maxParticipants",event.maxParticipants);
      formData.append("coordinatorName",event.coordinatorName);
      formData.append("coordinatorEmail",event.coordinatorEmail);
      if (event.image) {

        formData.append("image", event.image);

      }

      const response = await fetch(

        `https://campusconnect-backend-3hba.onrender.com/api/events/update/${id}`,

        {

          method: "PUT",

          body: formData

        }

      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        navigate(`/events/${id}`);

      }

      else {

        toast.error(data.message);

      }

    }

    catch {

      toast.error("Something went wrong");

    }

  }

  // =======================================================
  // SECTION 7 : UI
  // =======================================================

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">

          Edit Event

        </h1>

        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >

          <input

            className="w-full border rounded-lg p-3"

            name="title"

            value={event.title}

            onChange={handleChange}

          />

          <textarea

            className="w-full border rounded-lg p-3"

            name="description"

            value={event.description}

            onChange={handleChange}

          />

          <input

            className="w-full border rounded-lg p-3"

            name="category"

            value={event.category}

            onChange={handleChange}

          />

          <input

            className="w-full border rounded-lg p-3"

            type="date"

            name="date"

            value={event.date}

            onChange={handleChange}

          />

          <input

            className="w-full border rounded-lg p-3"

            name="venue"

            value={event.venue}

            onChange={handleChange}

          />
          <input
  className="w-full border rounded-lg p-3"
  name="registrationFee"
  placeholder="Registration Fee"
  value={event.registrationFee}
  onChange={handleChange}
/>

<input
  className="w-full border rounded-lg p-3"
  name="maxParticipants"
  placeholder="Maximum Participants"
  value={event.maxParticipants}
  onChange={handleChange}
/>

<input
  className="w-full border rounded-lg p-3"
  name="coordinatorName"
  placeholder="Coordinator Name"
  value={event.coordinatorName}
  onChange={handleChange}
/>

<input
  className="w-full border rounded-lg p-3"
  name="coordinatorEmail"
  placeholder="Coordinator Email"
  value={event.coordinatorEmail}
  onChange={handleChange}
/>
          {preview && (

            <img

              src={preview}

              alt="Preview"

              className="w-full h-52 rounded-xl object-cover"

            />

          )}

          <input

            type="file"

            accept="image/*"

            name="image"

            onChange={handleChange}

          />

          <button

            className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"

          >

            Update Event

          </button>

        </form>

      </div>

    </div>

  );

}

// =======================================================
// SECTION 8 : EXPORT
// =======================================================

export default EditEvent;