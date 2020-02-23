import axios from "axios";

let backendInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { authorization: "Bearer " + localStorage.getItem("token") }
});

export default backendInstance;
