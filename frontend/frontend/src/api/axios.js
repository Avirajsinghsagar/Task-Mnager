import axios from "axios";

const API = axios.create({
  baseURL: "https://task-mnager-production.up.railway.app/api",
});

export default API;