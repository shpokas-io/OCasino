const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptos.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
