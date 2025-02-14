import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { register } from "../store/authSlice";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import AuthCard from "../components/AuthCard";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      register({ name, email, password, confirmPassword })
    );
    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <AuthCard title="Register">
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <p className="rounded bg-red-100 px-3 py-2 text-red-600">{error}</p>
          )}
          <FormInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            text="Register"
            loading={loading}
            className="w-full"
          />
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default RegisterPage;
