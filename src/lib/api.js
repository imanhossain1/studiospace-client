// Function	Token লাগবে?
// getStudios()	না
// getFeaturedStudios()	না
// getSingleStudio()	না
// getCategories()	না
// getMyStudios(token)	হ্যাঁ
// addStudio(data, token)	হ্যাঁ
// updateStudio(id, data, token)	হ্যাঁ
// deleteStudio(id, token)	হ্যাঁ
// createBooking(data, token)	হ্যাঁ
// getMyBookings(token)	হ্যাঁ
// cancelBooking(id, token)	হ্যাঁ

const apiStudioUrl = "http://localhost:8000/studios";
const apiFeaturedStudioUrl = "http://localhost:8000/studios/featured";
const apiCategoryUrl = "http://localhost:8000/categories";
const apiBookingUrl = "http://localhost:8000/bookings";


// 1. Get All Studios or Category Wise Studios
// Public API: JWT লাগবে না।
export async function getStudios(category) {
  const url = category
    ? `${apiStudioUrl}?category=${encodeURIComponent(category)}`
    : apiStudioUrl;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}


// 2. Get Featured Studios
// Public API: JWT লাগবে না।
export async function getFeaturedStudios() {
  const res = await fetch(apiFeaturedStudioUrl);
  const data = await res.json();

  return data;
}


// 3. Get Single Studio
// Public API: JWT লাগবে না।
export async function getSingleStudio(id) {
  const res = await fetch(`${apiStudioUrl}/${id}`);
  const data = await res.json();

  return data;
}


// 4. Get Categories
// Public API: JWT লাগবে না।
export async function getCategories() {
  const res = await fetch(apiCategoryUrl);
  const data = await res.json();

  return data;
}


// 5. Get My Studio Listings
// Protected API: JWT লাগবে।
export async function getMyStudios(token) {
  const res = await fetch("http://localhost:8000/my-listings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get my studios");
  }

  return data;
}


// 6. Add New Studio
// Protected API: JWT লাগবে।
export async function addStudio(studioData, token) {
  const res = await fetch(apiStudioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studioData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add studio");
  }

  return data;
}


// 7. Update Studio
// Protected API: JWT লাগবে।
export async function updateStudio(id, studioData, token) {
  const res = await fetch(`${apiStudioUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studioData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update studio");
  }

  return data;
}


// 8. Delete Studio
// Protected API: JWT লাগবে।
export async function deleteStudio(id, token) {
  const res = await fetch(`${apiStudioUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete failed");
  }

  return data;
}


// 9. Create Booking
// Protected API: JWT লাগবে।
export async function createBooking(bookingData, token) {
  const res = await fetch(apiBookingUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data;
}


// 10. Get My Bookings
// Protected API: JWT লাগবে।
export async function getMyBookings(token) {
  const res = await fetch("http://localhost:8000/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get bookings");
  }

  return data;
}


// 11. Cancel Booking
// Protected API: JWT লাগবে।
export async function cancelBooking(id, token) {
  const res = await fetch(`${apiBookingUrl}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data;
}

