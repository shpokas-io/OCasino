import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/authSlice";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import AuthCard from "../components/AuthCard";
import { useNavigate, Link, useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inactivityMessage, setInactivityMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("reason") === "inactive") {
      setInactivityMessage("You have been logged out due to inactivity.");
    }
  }, [location.search]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <AuthCard title="Login">
        {inactivityMessage && (
          <p className="mb-4 rounded bg-yellow-100 px-3 py-2 text-yellow-800">
            {inactivityMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded bg-red-100 px-3 py-2 text-red-600">{error}</p>
          )}
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
          <Button
            type="submit"
            text="Sign In"
            loading={loading}
            className="w-full"
          />
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default LoginPage;
