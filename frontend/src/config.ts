import axios from "axios";
import { BASE_URL } from "./env";
const axios_instance = axios.create({
  baseURL: BASE_URL,
});

axios_instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default axios_instance;
