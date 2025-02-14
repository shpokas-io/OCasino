import {
  BetApiResponse,
  BetCancelResponse,
  BetsQueryParams,
} from "../types/betTypes";
import api from "./axiosInstance";

export const placeBet = async (
  amount: number,
  color: string
): Promise<BetApiResponse> => {
  const response = await api.post("/bet", { amount, color });
  return response.data;
};

export const getBets = async (params: BetsQueryParams) => {
  const queryParams: Record<string, string | number> = {
    page: params.page,
    limit: params.limit,
  };
  if (params.status) queryParams.status = params.status;
  if (params.betId) queryParams.id = params.betId;
  const response = await api.get("/my-bets", { params: queryParams });
  return response.data;
};

export const cancelBet = async (betId: string): Promise<BetCancelResponse> => {
  const response = await api.delete(`/my-bet/${betId}`);
  return response.data;
};
