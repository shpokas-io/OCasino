import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createBet, fetchBets } from "../store/betSlice";
interface SpinningWheelProps {
  betAmount: number;
  selectedColor: "black" | "red" | "blue";
  onSpinComplete: (winningColor: string, outcome: "won" | "lost") => void;
  onSelectColor: (color: "black" | "red" | "blue") => void;
}
const SpinningWheel: React.FC<SpinningWheelProps> = ({
  betAmount,
  selectedColor,
  onSpinComplete,
  onSelectColor,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const slices = [
    { color: "black", start: 0, end: 120 },
    { color: "red", start: 120, end: 240 },
    { color: "blue", start: 240, end: 360 },
  ];
  const getWinningColor = (pointerAngle: number) => {
    const slice = slices.find(
      (s) => pointerAngle >= s.start && pointerAngle < s.end
    );
    return slice ? slice.color : "";
  };
  const handleSpin = async () => {
    if (betAmount <= 0) return;
    setIsSpinning(true);
    await dispatch(createBet({ amount: betAmount, userChoice: selectedColor }));
    const randomOffset = Math.random() * 360;
    const newRotation = rotation + 720 + randomOffset;
    setRotation(newRotation);
    setTimeout(() => {
      const normalized = newRotation % 360;
      const pointerAngle = (360 - normalized) % 360;
      const resultColor = getWinningColor(pointerAngle);
      const outcome = resultColor === selectedColor ? "won" : "lost";
      setIsSpinning(false);
      dispatch(fetchBets({ page: 1, limit: 9999 }));
      onSpinComplete(resultColor, outcome);
    }, 2000);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-40 w-40">
        <div
          className="h-full w-full rounded-full"
          style={{
            transition: "transform 2s ease-out",
            transform: `rotate(${rotation}deg)`,
            background:
              "conic-gradient(black 0deg 120deg, red 120deg 240deg, blue 240deg 360deg)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl text-yellow-400">
          ▼
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        {slices.map((slice) => (
          <button
            key={slice.color}
            onClick={() => onSelectColor(slice.color)}
            className={`h-8 w-8 rounded-full border-2 ${
              slice.color === selectedColor
                ? "border-yellow-400 ring-2 ring-yellow-400"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: slice.color }}
          />
        ))}
      </div>
      <button
        onClick={handleSpin}
        disabled={isSpinning || betAmount <= 0}
        className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};
export default SpinningWheel;
