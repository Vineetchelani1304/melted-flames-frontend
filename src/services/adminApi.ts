import axios from "axios";

const adminApi = axios.create({
  baseURL: "/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAdminOrders = async () => {
  const res = await adminApi.get("/orders");
  return res.data;
};

export const updateAdminOrderStatus = async (orderId: string, status: string) => {
  const res = await adminApi.put(`/orders/${orderId}/status`, { status });
  return res.data;
};
