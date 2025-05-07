import { checkResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.olivialrj.strangled.net"
    : "http://localhost:3000";

export const register = (formData) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: formData, // Send FormData directly
  }).then((res) => {
    return res.json().then((data) => {
      if (!res.ok) {
        // Log the actual error response for debugging
        console.error("Server error response:", data);

        // Handle specific error cases
        if (res.status === 400) {
          if (data.message) {
            throw new Error(data.message);
          }
          if (data.error) {
            throw new Error(data.error);
          }
          if (data.validation) {
            throw new Error(data.validation.body.message);
          }
        } else if (res.status === 409) {
          throw new Error("This email is already registered");
        }
        // Default error message
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }
      return data;
    });
  });
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
