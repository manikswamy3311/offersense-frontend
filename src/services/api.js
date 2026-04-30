import axios from "axios";

const API = axios.create({
  baseURL: "/api",   // 👈 IMPORTANT CHANGE
});


export const getKPIs = async () => {
  const res = await API.get("/kpis");
  return res.data;
};