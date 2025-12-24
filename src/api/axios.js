import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-movie-backend-s4t0.onrender.com/movies",
});

export default API;
