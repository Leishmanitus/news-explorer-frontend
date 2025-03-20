import { url } from "./constants";
import { request } from "./api";

const handleCreateToken = () => {
  const token = Math.random().toString(36).substr(2);
  return token;
}

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
    body: JSON.stringify({ name, email, password, token: handleCreateToken() }),
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
  return request(`${url}/users?token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(users => {
    const user = users[0]
    return handleUserCheck({ ...user, token });
  });
};

const auth = {
  signup,
  signin,
  getUser,
};

export default auth;
