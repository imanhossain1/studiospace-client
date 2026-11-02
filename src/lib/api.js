
const apiStudioUrl = "http://localhost:8000/studios";
const apiFeaturedStudioUrl = "http://localhost:8000/studios/featured";
const apiCategoryUrl = "http://localhost:8000/categories";

// Get All Studios or Category Wise Studios
export async function getStudios(category) {
  const url = category
    ? `${apiStudioUrl}?category=${encodeURIComponent(category)}`
    : apiStudioUrl;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

// Get Featured Studios
export async function getFeaturedStudios() {
  const res = await fetch(apiFeaturedStudioUrl);
  const data = await res.json();

  return data;
}

// Get Single Studio
export async function getSingleStudio(id) {
  const res = await fetch(`${apiStudioUrl}/${id}`);
  const data = await res.json();

  return data;
}

// Get Categories
export async function getCategories() {
  const res = await fetch(apiCategoryUrl);
  const data = await res.json();

  return data;
}
