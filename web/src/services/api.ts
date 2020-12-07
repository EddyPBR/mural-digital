import axios from "axios";

const PORT = process.env.REACT_APP_PORT;
const HOST = process.env.REACT_APP_HOST;
const PREFIX = process.env.REACT_APP_PREFIX;

const api = axios.create({
  baseURL: `${PREFIX}://${HOST}:${PORT}`,
});

export default api;
