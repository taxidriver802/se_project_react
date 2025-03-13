import { baseUrl, request } from './api.js';

function signup(email, password, name, avatar) {
  return request(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, avatar }),
  });
}

function signin(email, password) {
  return request(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

function checkToken(token) {
  if (!token) {
    return Promise.reject('No token provided');
  }
  return request(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export { signup, signin, checkToken };
