// src/components/BetItem.tsx
import React from "react";

export interface BetItemProps {
  amount: number | { amount: number; userChoice?: string };
  status: string;
  userChoice?: string;
}

const statusClasses: Record<string, string> = {
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const BetItem: React.FC<BetItemProps> = ({ amount, status, userChoice }) => {
  console.log("BetItem props:", { amount, status, userChoice });
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
    <li className="flex items-center justify-between border-b py-2 text-gray-700">
      <div>
        <span>Amount: €{displayAmount}</span>
        {displayUserChoice && (
          <span className="ml-4 font-bold">
            Bet on:{" "}
            <span
              className={`capitalize ${
                displayUserChoice === "red"
                  ? "text-red-600"
                  : displayUserChoice === "blue"
                  ? "text-blue-600"
                  : "text-gray-900"
              }`}
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
