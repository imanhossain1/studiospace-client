
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const apiStudioUrl = `${apiBaseUrl}/studios`;
const apiFeaturedStudioUrl = `${apiStudioUrl}/featured`;
const apiCategoryUrl = `${apiBaseUrl}/categories`;
const apiBookingUrl = `${apiBaseUrl}/bookings`;
const apiMyListingsUrl = `${apiBaseUrl}/my-listings`;
const apiMyBookingsUrl = `${apiBaseUrl}/my-bookings`;

// 1. Get All Studios or Category Wise Studios
export async function getStudios(category) {
  const url = category
    ? `${apiStudioUrl}?category=${encodeURIComponent(category)}`
    : apiStudioUrl;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

// 2. Get Featured Studios
export async function getFeaturedStudios() {
  const res = await fetch(apiFeaturedStudioUrl);
  const data = await res.json();

  return data;
}

// 3. Get Single Studio
export async function getSingleStudio(id) {
  const res = await fetch(`${apiStudioUrl}/${id}`);
  const data = await res.json();

  return data;
}

// 4. Get Categories
export async function getCategories() {
  const res = await fetch(apiCategoryUrl);
  const data = await res.json();

  return data;
}

// 5. Get My Studio Listings
export async function getMyStudios(token) {
  const res = await fetch(apiMyListingsUrl, {
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
export async function getMyBookings(token) {
  const res = await fetch(apiMyBookingsUrl, {
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
