import { url } from "./constants";

const handleResponse = (res) => {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (urlVar, options) => {
  return fetch(urlVar, options).then(handleResponse);
};

const getArticleList = (token) => {
  return request(`${url}/articles?token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);
};

const addArticle = (article, token) => {
  return request(`${url}/articles?token=${token}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((articles) => {
      if (articles.length === 0) {
        return request(`${url}/articles`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: [article],
            token: token,
          }),
        });
      } else {
        const existingArticle = articles[0];
        return request(`${url}/articles/${existingArticle._id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: [...existingArticle.list, article],
          }),
        });
      }
    });
};

const removeArticle = (articleId, token) => {
  return request(`${url}/articles?token=${token}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({ message: 'Article not found' });
      } else {
        const existingArticle = articles[0];
        const updatedList = existingArticle.list.filter((article) => article._id !== articleId);

        return request(`${url}/articles/${existingArticle._id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: updatedList,
          }),
        });
      }
    });
};



const api = {
  getArticleList,
  addArticle,
  removeArticle,
};

export default api;
