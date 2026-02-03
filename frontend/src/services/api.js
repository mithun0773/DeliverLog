import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createPackage = (data) => API.post("/packages", data);
export const getPackages = (params) => API.get("/packages", { params });
