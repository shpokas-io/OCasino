import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { logout } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

//TODO: fix below
const UserMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );
  const formattedBalance = (balance ?? 0).toFixed(2);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="absolute right-0 top-16 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-3 text-gray-700 dark:text-gray-200">
        {name && (
          <div className="mb-1 text-sm">
            <span className="block font-medium">{name}</span>
            <span>
              Balance: {formattedBalance} {currency}
            </span>
          </div>
        )}
        <button
          className="mt-2 w-full rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
