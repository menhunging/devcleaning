import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  //   baseURL: "https://api-clining.fourodev.ru/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
