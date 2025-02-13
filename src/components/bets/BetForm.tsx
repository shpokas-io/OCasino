import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { createBet, fetchBets } from "../../store/betSlice";
//TODO: FIX LATER
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BetFormProps {}

const BetForm: React.FC<BetFormProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector((state: RootState) => state.auth.balance) || 0;

  const [amount, setAmount] = useState<number>(1);
  const [color, setColor] = useState<"black" | "red" | "blue">("red");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 1) {
      setError("Minimum bet is €1.00");
      return;
    }
    if (amount > balance) {
      setError("Bet cannot exceed your current balance");
      return;
    }

    setError("");
    const result = await dispatch(createBet({ amount, color }));
    if (createBet.fulfilled.match(result)) {
      dispatch(fetchBets({ page: 1, limit: 10 }));
      setAmount(1);
      setColor("red");
    } else {
      setError(result.payload as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
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

      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Place Bet
      </button>
    </form>
  );
};

export default BetForm;
