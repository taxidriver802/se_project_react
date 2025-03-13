const baseUrl = 'http://localhost:3000';

function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .catch((error) =>
      Promise.reject(`Network error: ${error.message || error}`)
    );
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return request(`${baseUrl}/items`, { method: 'GET' });
}

function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(itemId, token) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem, checkResponse, request, baseUrl };
