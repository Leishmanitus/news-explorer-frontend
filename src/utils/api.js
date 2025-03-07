import { url } from "./constants";

const handleResponse = (res) => {
  return res.status === "ok" ? res.json() : Promise.reject(`Error: ${res.message}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getArticleList = () => {
  return request(`${url}/saved-news`, {
    method: "GET",
    headers: {"Content-Type": "applicaiton/json",},
  });
};

const addArticle = ({ source, author, title, description, url, urlToImage, publishedAt, content }, token) => {
  return request(`${url}/saved-news`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ source, author, title, description, url, urlToImage, publishedAt, content }),
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



const api = {
  getArticleList,
  addArticle,
  removeArticle,
};

export default api;
