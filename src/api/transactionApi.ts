import { TransactionApiResponse } from "../types/transactionTypes";
import api from "./axiosInstance";

export const getTransactions = async (
  page: number,
  limit: number,
  type?: string,
  id?: string
): Promise<TransactionApiResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (type) params.type = type;
  if (id) params.id = id;
  const response = await api.get("/my-transactions", { params });
  return response.data;
};
