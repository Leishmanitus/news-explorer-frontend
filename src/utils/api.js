import { url } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (urlVar, options) => {

  return fetch(urlVar, options).then(handleResponse);
};

const getArticleList = (token) => {

  return request(`${url}/articles?token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.length !== 0 ? res : Promise.reject({ message: "Articles not found" });
  });
};

const addArticle = (article, token) => {

  return getArticleList(token)
    .then(articles => {
      const { list, id } = articles[0];
      console.log(list);

      if (list.length === 0 || !articles) {

        return request(`${url}/articles/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: [article],
            token: token,
          }),
        }).then(res => res);
      } else {

        return request(`${url}/articles/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: [...list, article],
          }),
        }).then(res => res);
      }
    });
};

const removeArticle = (articleURL, token) => {

  return getArticleList(token)
    .then((articles) => {
      const { list, id } = articles[0];
      if (list.length === 0 || !articles) {

        return Promise.reject({ message: 'Article not found' });
      } else {
        const updatedList = list.filter((article) => article.url !== articleURL);

        return request(`${url}/articles/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: updatedList,
          }),
        }).then(res => res);
      }
    });
};



const api = {
  getArticleList,
  addArticle,
  removeArticle,
  request,
};

export default api;
