import axios from "axios";

const PORT = process.env.REACT_APP_PORT;
const HOST = process.env.REACT_APP_HOST;

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});

export default api;