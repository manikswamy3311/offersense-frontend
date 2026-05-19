import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Get KPI metrics for dashboard
export const getKPIs = async () => {
  try {
    const res = await API.get("/kpis");
    return res.data;
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    throw error;
  }
};

// Get trend data for charts (last 30 days)
export const getTrendData = async () => {
  try {
    const res = await API.get("/trends");
    return res.data;
  } catch (error) {
    console.error("Error fetching trend data:", error);
    throw error;
  }
};

// Get campaign performance data
export const getCampaignData = async () => {
  try {
    const res = await API.get("/campaigns");
    return res.data;
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    throw error;
  }
};

// Get customer segment data
export const getCustomerSegments = async () => {
  try {
    const res = await API.get("/segments");
    return res.data;
  } catch (error) {
    console.error("Error fetching customer segments:", error);
    throw error;
  }
};

// Get offer effectiveness data
export const getOfferEffectiveness = async () => {
  try {
    const res = await API.get("/offers");
    return res.data;
  } catch (error) {
    console.error("Error fetching offer effectiveness:", error);
    throw error;
  }
};