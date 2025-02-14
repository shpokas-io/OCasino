import React from "react";

export interface BetItemProps {
  amount: number | { amount: number; userChoice?: string };
  status: string;
  userChoice?: string;
}

const statusClasses: Record<string, string> = {
  won: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  lost: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900",
};

const BetItem: React.FC<BetItemProps> = ({ amount, status, userChoice }) => {
  const displayAmount =
    typeof amount === "object" && amount !== null && "amount" in amount
      ? amount.amount
      : amount;
  const displayUserChoice =
    userChoice !== undefined
      ? userChoice
      : typeof amount === "object" && amount !== null && "userChoice" in amount
      ? amount.userChoice || ""
      : "";
  return (
    <li className="flex items-center justify-between border-b dark:border-gray-700 py-2 text-gray-700 dark:text-gray-200">
      <div>
        <span>Amount: €{displayAmount}</span>
        {displayUserChoice && (
          <span className="ml-4 font-bold">
            Bet on:
            <span
              className={
                displayUserChoice === "red"
                  ? "text-red-600 dark:text-red-400 ml-1"
                  : displayUserChoice === "blue"
                  ? "text-blue-600 dark:text-blue-400 ml-1"
                  : "text-gray-900 dark:text-gray-100 ml-1"
              }
            >
              {displayUserChoice}
            </span>
          </span>
        )}
      </div>
      <span
        className={`px-2 py-1 rounded text-sm font-semibold ${
          statusClasses[status.toLowerCase()] || statusClasses.default
        }`}
      >
        {status.toUpperCase()}
      </span>
    </li>
  );
};

export default BetItem;
