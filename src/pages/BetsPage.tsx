import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchBets } from "../store/betSlice";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import BetForm from "../components/bets/BetForm";
import BetsFilter from "../components/bets/BetsFilter";
import BetList from "../components/bets/BetList";
import SpinningWheel from "../components/bets/SpinningWheel";

const BetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bets, loading, error, page, limit, total } = useSelector(
    (state: RootState) => state.bets
  );
  const [amount, setAmount] = useState<number>(1);
  const [color, setColor] = useState<"black" | "red" | "blue">("red");
  const [spinResult, setSpinResult] = useState<{
    outcome: "won" | "lost";
    message: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleSpinComplete = (
    winningColor: "black" | "red" | "blue",
    outcome: "won" | "lost"
  ) => {
    setSpinResult({
      outcome,
      message: `You ${outcome}! Winning color: ${winningColor}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <div className="mx-auto w-full max-w-4xl flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Betting Page
          </h1>
        </div>
        <div className="mb-8 rounded-md bg-white dark:bg-gray-800 p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Place a Bet
          </h2>
          <BetForm amount={amount} setAmount={setAmount} error="" />
          <div className="mt-4">
            <SpinningWheel
              betAmount={amount}
              selectedColor={color}
              onSpinComplete={handleSpinComplete}
              onSelectColor={setColor}
            />
          </div>
          {spinResult && (
            <p
              className={
                spinResult.outcome === "won"
                  ? "mt-4 text-center text-lg font-semibold text-green-600"
                  : "mt-4 text-center text-lg font-semibold text-red-600"
              }
            >
              {spinResult.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <BetsFilter
            currentStatus=""
            currentPage={page}
            limit={limit}
            total={total}
          />
        </div>
        <div className="rounded-md bg-white dark:bg-gray-800 p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            All Bets
          </h2>
          {loading && (
            <p className="text-gray-500 dark:text-gray-400">
              Loading your bets...
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && bets.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No bets found.</p>
          )}
          {!loading && !error && bets.length > 0 && <BetList bets={bets} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BetsPage;
