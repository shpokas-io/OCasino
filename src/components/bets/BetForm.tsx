import React from "react";

interface BetFormProps {
  amount: number;
  setAmount: (value: number) => void;
  error: string;
}

const BetForm: React.FC<BetFormProps> = ({ amount, setAmount, error }) => {
  return (
    <form className="flex flex-col items-center space-y-4">
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Bet Amount (€)
        </label>
        <input
          type="number"
          value={amount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 w-40 rounded border border-gray-300 dark:border-gray-600 p-2 text-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        />
      </div>
    </form>
  );
};

export default BetForm;
