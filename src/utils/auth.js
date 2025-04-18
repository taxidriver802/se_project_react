import { request } from './api.js';
import { BASE_URL } from './constants.js';

function signup(email, password, name, avatar) {
  return request(`${BASE_URL}/signup`, {
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
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).catch((error) =>
    Promise.reject(`Failed to sign in: ${error.message || error}`)
  );
}

function updateCurrentUser({ name, avatar }, token) {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).catch((error) =>
    Promise.reject(`Failed to update user: ${error.message || error}`)
  );
}

function checkToken(token) {
  if (!token) {
    return Promise.reject('No token provided');
  }
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).catch((error) =>
    Promise.reject(`Failed to check token: ${error.message || error}`)
  );
}

export { signup, signin, checkToken, updateCurrentUser };
