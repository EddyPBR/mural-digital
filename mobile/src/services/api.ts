import { HOST } from "react-native-dotenv";
import axios from "axios";

const host = HOST;
const api = axios.create({
  baseURL: `https://${host}`,
});

export default api;
