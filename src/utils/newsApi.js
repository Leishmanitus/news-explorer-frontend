import { apiInfo } from "./constants";

export const getSearchResults = (searchWord) => {
  const { API_KEY, API_URL } = apiInfo;
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const formattedPastDate = pastDate.toISOString().split("T")[0];

  const url = `${API_URL}?q=${searchWord}&from=${formattedPastDate}&to=${formattedCurrentDate}&language=en&pageSize=100&sortBy=relevancy&apiKey=${API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

const api = {
  getSearchResults,
};

export default api;
