import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import { fetchBets } from "../store/betSlice";
import BetList from "../components/bets/BetList";
import { fetchTransactions } from "../store/transactionSlice";
import TransactionList from "../components/transactions/TransactionList";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { bets, loading: betsLoading } = useSelector(
    (state: RootState) => state.bets
  );

  const { name, balance, currency } = useSelector(
    (state: RootState) => state.auth
  );

  const { transactions, loading: transactionsLoading } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 3 }));
    dispatch(fetchTransactions({ page: 1, limit: 3 }));
  }, [dispatch]);

  const formattedBalance = (balance ?? 0).toFixed(2);
  const formattedCurrency = currency ?? "";

  const handleStartBetting = () => {
    navigate("/bets");
  };

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
          {/* Recent Bets Section */}
          <section className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Recent Bets
            </h2>
            {betsLoading ? (
              <p className="text-gray-500">Loading bets...</p>
            ) : bets && bets.length > 0 ? (
              <BetList bets={bets} />
            ) : (
              <p className="text-gray-500">No recent bets found.</p>
            )}
          </section>
          {/* Recent Transactions Section */}
          <section className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Recent Transactions
            </h2>
            {transactionsLoading ? (
              <p className="text-gray-500">Loading transactions...</p>
            ) : transactions && transactions.length > 0 ? (
              <TransactionList transactions={transactions} />
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-500">No recent transactions found.</p>
                <p className="text-gray-600">
                  Ready to win some money? Start placing bets now!
                </p>
                <button
                  onClick={handleStartBetting}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Go to Betting Page
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
