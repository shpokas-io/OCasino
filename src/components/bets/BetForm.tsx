import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface BetFormProps {
  amount: number;
  setAmount: (value: number) => void;
  color: "black" | "red" | "blue";
  setColor: (value: "black" | "red" | "blue") => void;
  error: string;
}
const BetForm: React.FC<BetFormProps> = ({
  amount,
  setAmount,
  color,
  setColor,
  error,
}) => {
  const balance = useSelector((state: RootState) => state.auth.balance) || 0;
  return (
    <form className="flex flex-col items-center space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bet Amount (€)
        </label>
        <input
          type="number"
          value={amount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 w-40 rounded border border-gray-300 p-2 text-center"
        />
      </div>
      <div className="flex space-x-4">
        {(["black", "red", "blue"] as const).map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setColor(c)}
            className={`px-3 py-2 rounded font-semibold text-white ${
              color === c ? "ring-2 ring-offset-2 ring-" + c + "-500" : ""
            } ${
              c === "black"
                ? "bg-gray-900 hover:bg-black"
                : c === "red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>
    </form>
  );
};
export default BetForm;
