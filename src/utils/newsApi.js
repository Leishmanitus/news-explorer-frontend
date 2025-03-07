import { apiInfo } from "./constants";
import { request } from "./api";

const { API_KEY, API_URL } = apiInfo;

export const getSearchResults = (searchWord) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const formattedPastDate = pastDate.toISOString().split("T")[0];

  const url = `${API_URL}?q=${searchWord}&from=${formattedPastDate}&to=${formattedCurrentDate}&language=en&pageSize=100&sortBy=relevancy&apiKey=${API_KEY}`;

  return request(url, {
    method: "GET",
  });
};

const api = {
  getSearchResults,
};

export default api;
