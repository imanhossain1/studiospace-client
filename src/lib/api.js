
const apiStudioUrl = "http://localhost:8000/studios";
const apiFeaturedStudioUrl = "http://localhost:8000/studios/featured";
const apiCategoryUrl = "http://localhost:8000/categories";


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
export async function getMyStudios(email) {
  const res = await fetch(
    `http://localhost:8000/my-listings?email=${email}`
  );

  const data = await res.json();

  return data;
}


// 6. Add New Studio
export async function addStudio(studioData) {
  const res = await fetch(apiStudioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studioData),
  });

  const data = await res.json();

  return data;
}


// 7. Update Studio
export async function updateStudio(id, studioData) {
  const res = await fetch(`${apiStudioUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studioData),
  });

  const data = await res.json();

  return data;
}


// 8. Delete Studio
export async function deleteStudio(id) {
  const res = await fetch(`${apiStudioUrl}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}
