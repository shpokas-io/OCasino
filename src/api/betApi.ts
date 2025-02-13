import api from "./axiosInstance";
export const placeBet = async (amount: number, color: string) => {
  const response = await api.post("/bet", { amount, color });
  return response.data;
};

export const getBets = async ({
  page,
  limit,
  status,
  betId,
}: {
  page: number;
  limit: number;
  status?: string;
  betId?: string;
}) => {
  const params: Record<string, string | number> = { page, limit };
  if (status) params.status = status;
  if (betId) params.id = betId;

  const response = await api.get("/my-bets", { params });
  return response.data;
};

export const cancelBet = async (betId: string) => {
  const response = await api.delete(`/my-bet/${betId}`);
  return response.data;
};
