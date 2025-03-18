import { url } from "./constants";
import { request } from "./api";

const handleUserCheck = (user) => {
  if (user) {
    return { data: user };
  } else {
    return Promise.reject({ message: 'User not found' });
  }
};

const signup = ({ name, email, password }) => {
  return request(`${url}/users`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, email, password }),
  })
};
  
const signin = ({ email, password }) => {
  return request(`${url}/users`, {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
  }).then(users => {
    const user = users.find(user => user.email === email && user.password === password);
    return handleUserCheck(user);
  });
};

const getUser = (token) => {
  return request(`${url}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(users => {
    const user = users.find(users, user => user.token === token);
    return handleUserCheck(user);
  });
};

const auth = {
  signup,
  signin,
  getUser,
};

export default auth;
