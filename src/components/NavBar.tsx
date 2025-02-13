// src/components/NavBar.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX, HiOutlineUserCircle } from "react-icons/hi";
import UserMenu from "./UserMenu";

const NavBar: React.FC = () => {
  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsUserMenuOpen(false);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
    setIsMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-500 flex-shrink-0"
        >
          TG Lab
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/bets"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Bets
          </Link>
          <Link
            to="/transactions"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Transactions
          </Link>
          <button
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={toggleUserMenu}
          >
            <HiOutlineUserCircle className="h-6 w-6" />
          </button>
          {isUserMenuOpen && (
            <UserMenu onClose={() => setIsUserMenuOpen(false)} />
          )}
        </div>
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6 text-gray-700" />
          ) : (
            <HiMenuAlt3 className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/bets"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Bets
            </Link>
            <Link
              to="/transactions"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
            {name && (
              <div className="mt-4 border-t pt-4 text-gray-600">
                <div className="mb-1 text-sm">
                  <span className="block font-medium">{name}</span>
                  Balance: {(balance ?? 0).toFixed(2)} {currency}
                </div>
                <button
                  className="mt-2 w-full rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  onClick={() => {}}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
