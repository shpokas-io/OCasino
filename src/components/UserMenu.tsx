import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <div className="absolute right-0 top-16 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-3">
        {name && (
          <div className="mb-1 text-sm text-gray-600">
            <span className="block font-medium">{name}</span>
            Balance: {(balance ?? 0).toFixed(2)} {currency}
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
