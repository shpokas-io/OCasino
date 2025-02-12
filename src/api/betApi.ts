import api from "./axiosInstance";

export const placeBet = async (amount: number) => {
  const response = await api.post("/bet", { amount });
  return response.data;
};

export const getBets = async (page: number, limit: number, status?: string) => {
  const params = { page, limit, status };
  const response = await api.get("/my-bets", { params });
  return response.data;
};

export const cancelBet = async (betId: string) => {
  const response = await api.delete(`/my-bet/${betId}`);
  return response.data;
};
