const baseUrl = 'http://localhost:3000';

function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .catch((error) =>
      Promise.reject(`Network error: ${error.message || error}`)
    );
}

function checkResponse(res) {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err) => Promise.reject(`Error: ${res.status} - ${err.message}`));
}

function getItems() {
  return request(`${baseUrl}/items`, { method: 'GET' }).catch((error) =>
    Promise.reject(`Failed to fetch items: ${error}`)
  );
}

function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).catch((error) => Promise.reject(`Failed to add item: ${error}`));
}

function deleteItem(itemId, token) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).catch((error) => Promise.reject(`Failed to delete item: ${error}`));
}

export { getItems, addItem, deleteItem, checkResponse, request, baseUrl };
