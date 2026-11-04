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

// ==========================
// const apiStudioUrl = "http://localhost:8000/studios";
// const apiFeaturedStudioUrl = "http://localhost:8000/studios/featured";
// const apiCategoryUrl = "http://localhost:8000/categories";
// const apiBookingUrl = "http://localhost:8000/bookings";


// // 1. Get All Studios or Category Wise Studios
// // কাজ: সব Studio অথবা নির্দিষ্ট Category-এর Studio দেখাবে
// // Public API, তাই JWT লাগবে না।
// export async function getStudios(category) {
//   const url = category
//     ? `${apiStudioUrl}?category=${encodeURIComponent(category)}`
//     : apiStudioUrl;

//   const res = await fetch(url);
//   const data = await res.json();

//   return data;
// }


// // 2. Get Featured Studios
// // কাজ: Home page-এ Featured Studios দেখাবে
// // Public API, তাই JWT লাগবে না।
// export async function getFeaturedStudios() {
//   const res = await fetch(apiFeaturedStudioUrl);
//   const data = await res.json();

//   return data;
// }


// // 3. Get Single Studio
// // কাজ: Studio Details page-এ একটি Studio-এর তথ্য দেখাবে
// // Studio details public হলে JWT ছাড়াই কাজ করবে।
// export async function getSingleStudio(id, token) {
//   const res = await fetch(`${apiStudioUrl}/${id}`);

//   const data = await res.json();

//   return data;
// }


// // 4. Get Categories
// // কাজ: Studio Category গুলো দেখাবে
// // Public API, তাই JWT লাগবে না।
// export async function getCategories() {
//   const res = await fetch(apiCategoryUrl);
//   const data = await res.json();

//   return data;
// }


// // 5. Get My Studio Listings
// // কাজ: Login করা user-এর নিজের Studio দেখাবে
// // বর্তমানে email দিয়ে কাজ করছে। Backend-এ JWT protection
// // যোগ করলে এটাকেও token-based করতে হবে।
// export async function getMyStudios(email) {
//   const res = await fetch(
//     `http://localhost:8000/my-listings?email=${encodeURIComponent(email)}`
//   );

//   const data = await res.json();

//   return data;
// }


// // 6. Add New Studio
// // কাজ: নতুন Studio database-এ save করবে
// // বর্তমানে আগের মতোই রাখা হয়েছে।
// export async function addStudio(studioData) {
//   const res = await fetch(apiStudioUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(studioData),
//   });

//   const data = await res.json();

//   return data;
// }


// // 7. Update Studio
// // কাজ: Studio-এর information update করবে
// // বর্তমানে আগের মতোই রাখা হয়েছে।
// export async function updateStudio(id, studioData) {
//   const res = await fetch(`${apiStudioUrl}/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(studioData),
//   });

//   const data = await res.json();

//   return data;
// }


// // 8. Delete Studio
// // কাজ: একটি Studio delete করবে
// // JWT protected backend route হলে Bearer token পাঠাতে হবে।
// export async function deleteStudio(id, token) {
//   const res = await fetch(`${apiStudioUrl}/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Delete failed");
//   }

//   return data;
// }


// // 9. Create Booking
// // কাজ: User-এর booking database-এ save করবে
// // JWT দিয়ে backend-এ user verify করবে।
// export async function createBooking(bookingData, token) {
//   const res = await fetch(apiBookingUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bookingData),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Booking failed");
//   }

//   return data;
// }


// // 10. Get My Bookings
// // কাজ: Login করা user-এর নিজের সব booking দেখাবে
// // Email পাঠানোর দরকার নেই। JWT থেকে backend user চিনবে।
// export async function getMyBookings(token) {
//   const res = await fetch("http://localhost:8000/my-bookings", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to get bookings");
//   }

//   return data;
// }


// // 11. Cancel Booking
// // কাজ: User নিজের Pending booking cancel করতে পারবে
// // JWT থেকে backend user verify করবে।
// export async function cancelBooking(id, token) {
//   const res = await fetch(`${apiBookingUrl}/${id}`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to cancel booking");
//   }

//   return data;
// }
