import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-500"
        >
          TG Lab
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/bets"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Bets
          </Link>
          <Link
            to="/transactions"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Transactions
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {name && (
            <span className="text-sm text-gray-600">
              Hello, <span className="font-semibold">{name}</span>
            </span>
          )}
          <span className="text-sm text-gray-600">
            Balance:{" "}
            <span className="font-semibold">
              {balance.toFixed(2)} {currency}
            </span>
          </span>
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
