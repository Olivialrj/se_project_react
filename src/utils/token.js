const TOKEN_KEY = "jwt";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// getToken retrieves and returns the value associated with
// TOKEN_KEY from localStorage.
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
