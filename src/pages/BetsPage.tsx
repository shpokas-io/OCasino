// src/pages/BetsPage.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createBet, fetchBets } from "../store/betSlice";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BetItem from "../components/BetItem";

const BetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [betAmount, setBetAmount] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<"black" | "red" | "blue">(
    "red"
  );
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winningColor, setWinningColor] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<"idle" | "won" | "lost">("idle");
  const { bets, loading: betsLoading } = useSelector(
    (state: RootState) => state.bets
  );
  const { balance, currency } = useSelector((state: RootState) => state.auth);
  console.log("BetsPage state:", { balance, currency });
  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 9999 }));
  }, [dispatch]);
  const slices = [
    { color: "black", start: 0, end: 120 },
    { color: "red", start: 120, end: 240 },
    { color: "blue", start: 240, end: 360 },
  ];
  const getWinningColorFromPointer = (pointerAngle: number) => {
    const slice = slices.find(
      (s) => pointerAngle >= s.start && pointerAngle < s.end
    );
    return slice ? slice.color : null;
  };
  const handleSpin = async () => {
    if (betAmount <= 0) return;
    console.log("handleSpin called:", { betAmount, selectedColor });
    setWinningColor(null);
    setOutcome("idle");
    setIsSpinning(true);
    try {
      await dispatch(
        createBet({ amount: betAmount, userChoice: selectedColor })
      );
      const randomOffset = Math.random() * 360;
      const newRotation = rotation + 720 + randomOffset;
      console.log("New rotation:", newRotation);
      setRotation(newRotation);
      setTimeout(() => {
        const normalizedRotation = newRotation % 360;
        const pointerAngle = (360 - normalizedRotation) % 360;
        console.log(
          "Normalized rotation:",
          normalizedRotation,
          "pointerAngle:",
          pointerAngle
        );
        const resultColor = getWinningColorFromPointer(pointerAngle);
        console.log("Result color:", resultColor);
        setWinningColor(resultColor);
        setOutcome(resultColor === selectedColor ? "won" : "lost");
        setIsSpinning(false);
        dispatch(fetchBets({ page: 1, limit: 9999 }));
      }, 2000);
    } catch (error) {
      console.error("handleSpin error:", error);
      setIsSpinning(false);
    }
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
                onClick={() =>
                  setSelectedColor(color as "black" | "red" | "blue")
                }
              >
                {color.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative mb-4 h-40 w-40">
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                transition: "transform 2s linear",
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(black 0deg 120deg, red 120deg 240deg, blue 240deg 360deg)`,
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl text-yellow-400">
              ▼
            </div>
          </div>
          {!isSpinning && outcome !== "idle" && winningColor && (
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
          <button
            onClick={handleSpin}
            disabled={isSpinning || betAmount <= 0}
            className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        </div>
        <div className="rounded-md bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">All Bets</h2>
          {betsLoading ? (
            <p className="text-gray-500">Loading your bets...</p>
          ) : bets && bets.length > 0 ? (
            <ul className="space-y-2">
              {bets.map((bet) => {
                console.log("Rendering bet:", bet);
                return (
                  <BetItem
                    key={bet.id}
                    amount={bet.amount}
                    status={bet.status}
                    userChoice={bet.userChoice}
                  />
                );
              })}
            </ul>
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
