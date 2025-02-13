import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import { fetchBets } from "../store/betSlice";
import BetList from "../components/BetList";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bets, loading } = useSelector((state: RootState) => state.bets);
  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 3 }));
  }, [dispatch]);

  const formattedBalance = (balance ?? 0).toFixed(2);
  const formattedCurrency = currency ?? "";

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {name || "Player"}!
          </h1>
          <p className="text-gray-600">
            Your current balance:{" "}
            <span className="font-semibold">
              {formattedBalance} {formattedCurrency}
            </span>
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Recent Bets
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading bets...</p>
            ) : bets && bets.length > 0 ? (
              <BetList bets={bets} />
            ) : (
              <p className="text-gray-500">No recent bets found.</p>
            )}
          </section>
          <section className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Recent Transactions
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
