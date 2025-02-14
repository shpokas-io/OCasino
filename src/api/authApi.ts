import api from "./axiosInstance";
import { loginSchema, registerSchema } from "../validations/authValidations";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/authTypes";

export const registerUser = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  await registerSchema.validate(data, { abortEarly: false });
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  await loginSchema.validate(data, { abortEarly: false });
  const response = await api.post("/login", data);
  return response.data;
};
