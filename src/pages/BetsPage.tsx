import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchBets } from "../store/betSlice";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import SpinningWheel from "../components/SpinningWheel";
import BetList from "../components/BetList";

const BetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [betAmount, setBetAmount] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<"black" | "red" | "blue">(
    "red"
  );
  const [winningColor, setWinningColor] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<"idle" | "won" | "lost">("idle");
  const { bets, loading } = useSelector((state: RootState) => state.bets);
  const { balance, currency } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 9999 }));
  }, [dispatch]);
  const onSpinComplete = (resultColor: string, spinOutcome: "won" | "lost") => {
    setWinningColor(resultColor);
    setOutcome(spinOutcome);
  };
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <NavBar />
      <div className="mx-auto w-full max-w-4xl flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">3-Color Wheel</h1>
          <p className="mt-2 text-gray-600">
            Current balance:{" "}
            <span className="font-semibold">
              {(balance ?? 0).toFixed(2)} {currency ?? ""}
            </span>
          </p>
        </div>
        <div className="mb-8 flex flex-col items-center space-y-4 rounded-md bg-white p-6 shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bet Amount
            </label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="mt-1 w-40 rounded border border-gray-300 p-2 text-center"
              min={0}
            />
          </div>
          <div className="flex space-x-4">
            {["black", "red", "blue"].map((color) => (
              <button
                key={color}
                onClick={() =>
                  setSelectedColor(color as "black" | "red" | "blue")
                }
                className={`px-3 py-2 rounded font-semibold text-white ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-" + color + "-500"
                    : ""
                } ${
                  color === "black"
                    ? "bg-gray-900 hover:bg-black"
                    : color === "red"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {color.toUpperCase()}
              </button>
            ))}
          </div>
          <SpinningWheel
            betAmount={betAmount}
            selectedColor={selectedColor}
            onSpinComplete={onSpinComplete}
          />
          {outcome !== "idle" && winningColor && (
            <div className="text-center">
              <p className="mb-2">
                The wheel landed on{" "}
                <span className="font-bold capitalize">{winningColor}</span>!
              </p>
              <div
                className={`rounded p-3 text-lg font-semibold ${
                  outcome === "won"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {outcome === "won"
                  ? "Congratulations, You Won!"
                  : "Sorry, You Lost!"}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-md bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">All Bets</h2>
          {loading ? (
            <p className="text-gray-500">Loading your bets...</p>
          ) : bets && bets.length > 0 ? (
            <BetList bets={bets} />
          ) : (
            <p className="text-gray-500">No bets found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BetsPage;
