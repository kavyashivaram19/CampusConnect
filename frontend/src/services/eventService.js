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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;

}

// =======================================================
// GET MY REGISTRATIONS
// =======================================================

export async function getMyRegistrations(userId) {

  const response = await fetch(
    `http://localhost:5000/api/registrations/user/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch registrations");
  }

  return response.json();

}
// =======================================================
// GET DASHBOARD STATS
// =======================================================

export async function getDashboardStats(userId) {

  const response = await fetch(
    `http://localhost:5000/api/registrations/stats/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();

}
export async function getCoordinatorDashboard(coordinatorId) {

  const response = await fetch(
    `http://localhost:5000/api/registrations/coordinator/${coordinatorId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }

  return await response.json();
}