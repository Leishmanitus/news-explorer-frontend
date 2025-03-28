import { url } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (urlVar, options) => {

  return fetch(urlVar, options).then(handleResponse);
};

const getArticleList = (token) => {

  return request(`${url}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((articles) => {
    const filteredArticles = articles.filter((article) => article.token === token);
    if (filteredArticles.length === 0) {
      return Promise.reject({ message: "Articles not found" })
    }
    if (typeof articles !== "object" || articles === null) {
      console.error("Invalid response from server:", articles);
      return Promise.reject({ message: "Invalid articles data" });
    }
    return filteredArticles;
  });
};

const addArticle = (article, token) => {
  const articleWithToken = { ...article, token };

  return request(`${url}/articles`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleWithToken),
  });
};

const removeArticle = (articleURL, token) => {

  return getArticleList(token)
    .then((articles) => {
      const articleToDelete = articles.find((article) => article.url === articleURL);

      if (!articleToDelete) {
        return Promise.reject({ message: 'Article not found' });
      }

      return request(`${url}/articles/${articleToDelete.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
};



const api = {
  getArticleList,
  addArticle,
  removeArticle,
  request,
};

export default api;
