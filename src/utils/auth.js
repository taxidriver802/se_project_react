import { baseUrl, request } from './api.js';

function signup(email, password, name, avatar) {
  return request(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).catch((error) =>
    Promise.reject(`Failed to sign up: ${error.message || error}`)
  );
}

function signin(email, password) {
  return request(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).catch((error) =>
    Promise.reject(`Failed to sign in: ${error.message || error}`)
  );
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
  }).catch((error) =>
    Promise.reject(`Failed to check token: ${error.message || error}`)
  );
}

export { signup, signin, checkToken };
