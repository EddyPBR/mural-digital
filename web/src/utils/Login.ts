const TOKEN_KEY = "acess_token";

export const login = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (sessionStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
