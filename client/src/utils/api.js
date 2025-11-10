import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const api = {
  optimizeBudget: (data) => axios.post(`${API_BASE}/optimize-budget`, data),
  optimizeTax: (data) => axios.post(`${API_BASE}/optimize-tax`, data),
  planSavings: (data) => axios.post(`${API_BASE}/plan-savings`, data),
  calculateEMI: (data) => axios.post(`${API_BASE}/calculate-emi`, data),
};
