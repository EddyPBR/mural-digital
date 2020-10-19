import api from "../services/api";

const TOKEN_KEY = "access_token";

export const login = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (!sessionStorage.getItem(TOKEN_KEY)) return false;

  const authorization = api
    .get("/auth", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((response) => true)
    .catch((error) => false);

  return authorization;
};
