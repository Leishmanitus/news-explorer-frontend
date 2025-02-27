import { apiInfo } from "./constants";

const { API_KEY, API_URL } = apiInfo;

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (options) => {
  return fetch(`{API_URL}apiKey={API_KEY}`, options).then(handleResponse);
};

// const updateUser = ({name, avatar}, token) => {
//   return request(`${API_URL}/users/me`, {
//     method: "PATCH",
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify({ name, avatar }),
//   });
// };

// const api = {
//   updateUser,
// };

// export default api;
