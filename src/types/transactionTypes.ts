export interface Transaction {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
}

export interface TransactionApiResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}
