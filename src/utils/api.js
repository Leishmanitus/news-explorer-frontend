import { url } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getArticlesList = () => {
  return request(`${url}/saved-news`, {
    method: "GET",
    headers: {"Content-Type": "applicaiton/json",},
  });
};

const addArticle = ({ name, imageUrl }, token) => {
  return request(`${url}/saved-news`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, imageUrl }),
  });
};

const removeArticle = (_id, token) => {
  return request(`${url}/saved-news/${_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

const updateUser = ({ name }, token) => {
  return request(`${url}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name }),
  });
};

const api = {
  getArticlesList,
  addArticle,
  removeArticle,
  updateUser,
};

export default api;
