export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accessToken: string;
}
