import api from "./axiosInstance";

export const getTransactions = async (
  page: number,
  limit: number,
  type?: string
) => {
  const params = { page, limit, type };
  const response = await api.get("/my-transactions", { params });
  return response.data;
};
