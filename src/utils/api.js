import { getToken } from "./token";

const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const postItems = ({ name, imageUrl, weather }) => {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

const deleteItems = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
const editProfile = ({ name, avatarUrl }) => {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatarUrl }),
  }).then(checkResponse);
};

const addCardLike = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const removeCardLike = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export {
  getItems,
  postItems,
  deleteItems,
  checkResponse,
  checkToken,
  editProfile,
  addCardLike,
  removeCardLike,
};
