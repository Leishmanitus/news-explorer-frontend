import { url } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const updateUser = ({name, avatar}, token) => {
  return request(`${url}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const api = {
  updateUser,
};

export default api;
