import { apiInfo } from "./constants";
import { request } from "./api";

const { API_KEY, API_URL } = apiInfo;

export const getSearchResults = (searchWord) => {
  const url = `${API_URL}q=${searchWord}&language=en&sortBy=relevancy&apiKey=${API_KEY}`;

  return request(url, {
    method: "GET",
  });
};

const api = {
  getSearchResults,
};

export default api;
