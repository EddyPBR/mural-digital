import axios from "axios";

const HOST = "192.168.15.126"
const PORT = "3001"

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});

export default api;
