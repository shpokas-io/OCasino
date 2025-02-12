import api from "./axiosInstance";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/login", data);
  return response.data;
};
