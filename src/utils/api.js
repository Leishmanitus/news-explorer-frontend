import { url } from "./constants";

const handleResponse = (res) => {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (urlVar, options) => {
  return fetch(urlVar, options).then(handleResponse);
};

const getArticleList = () => {
  return request(`${url}/articles`, {
    method: "GET",
    headers: {"Content-Type": "application/json",},
  }).then((res) => res.data);
};

const addArticle = (data, token) => {
  const { source, author, title, description, url, urlToImage, publishedAt, content } = data;
  return request(`${url}/articles`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ source, author, title, description, url, urlToImage, publishedAt, content }),
  });
};

const removeArticle = (_id, token) => {
  return request(`${url}/articles/${_id}`, {
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
