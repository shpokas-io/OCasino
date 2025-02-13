import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { RootState } from "../store/store";
import { fetchBets } from "../store/betSlice";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();

  const { bets, loading: betsLoading } = useSelector(
    (state: RootState) => state.bets
  );
  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 3 }));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {name ? name : "Player"}!
          </h1>
          <p className="text-gray-600">
            Your current balance:{" "}
            <span className="font-semibold">
              {balance.toFixed(2)} {currency}
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Recent Bets
            </h2>
            {betsLoading ? (
              <p className="text-gray-500">Loading bets...</p>
            ) : bets && bets.length > 0 ? (
              <ul className="space-y-2">
                {bets.map((bet) => (
                  <li
                    key={bet.id}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <span>Amount: €{bet.amount}</span>
                    <span>Status: {bet.status}</span>
                  </li>
                ))}
              </ul>
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
