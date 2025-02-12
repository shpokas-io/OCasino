export const getTransactions = async (
  page: number,
  limit: numver,
  type?: string
) => {
  const params = { page, limit, type };
  const response = await api.get("/my-transactions", { params });
  return response.data;
};
