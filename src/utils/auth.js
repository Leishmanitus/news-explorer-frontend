import { url } from "./constants";
import { request } from "./api";

const signup = ({ name, email, password }) => {
  return request(`${url}/signup`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, email, password }),
  })
};
  
const signin = ({ email, password }) => {
  return request(`${url}/signin`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  })
};

const getUser = (token) => {
  return request(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
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

const auth = {
  signup,
  signin,
  getUser,
  updateUser,
};

export default auth;
