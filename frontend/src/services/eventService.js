const BASE_URL = "http://localhost:5000/api/events";

export async function getAllEvents() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}
export async function getEventById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export async function registerForEvent(userId, eventId) {
  const response = await fetch(
    "http://localhost:5000/api/registrations/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    }
  );

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}