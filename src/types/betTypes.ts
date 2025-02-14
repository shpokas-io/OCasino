export interface Bet {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  winAmount?: number | null;
  userChoice?: string;
}

export interface BetApiResponse {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount?: number | null;
}

export interface BetCancelResponse {
  transactionId: string;
  balance: number;
  currency: string;
}

export interface BetsQueryParams {
  page: number;
  limit: number;
  status?: string;
  betId?: string;
}

export interface BetsResponse {
  data: Bet[];
  total: number;
  page: number;
  limit: number;
}
