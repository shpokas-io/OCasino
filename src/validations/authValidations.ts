import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().trim().min(2).max(50).required(),
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).max(100).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).max(100).required(),
});
