import { checkResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.olivialrj.strangled.net"
    : "http://localhost:3000";

export const register = (email, password, name, avatarUrl) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatarUrl }),
  }).then(checkResponse);
};

export const authorisation = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};
