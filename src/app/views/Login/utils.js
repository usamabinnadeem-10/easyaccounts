export const setToken = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refresh", data.token);
};
