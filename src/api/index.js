import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
