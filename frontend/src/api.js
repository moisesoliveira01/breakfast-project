import axios from "axios";

const api = axios.create({
  baseURL: "http://breakfastproj-backend.herokuapp.com/api/",
});

export default api;