import axios from "axios";

const API = axios.create({
  baseURL: "https://task-mnager-production.up.railway.app/api",
});

API.interceptors.request.use(
  (req) => {

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {

      const token = JSON.parse(userInfo).token;

      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;