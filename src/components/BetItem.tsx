import React from "react";

export interface BetItemProps {
  amount: number;
  status: string;
}

const statusClasses: Record<string, string> = {
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const BetItem: React.FC<BetItemProps> = ({ amount, status }) => {
  const badgeClass =
    statusClasses[status.toLowerCase()] || statusClasses.default;
  return (
    <li className="flex items-center justify-between border-b py-2 text-gray-700">
      <span>Amount: €{amount}</span>
      <span className={`px-2 py-1 rounded text-sm font-semibold ${badgeClass}`}>
        {status.toUpperCase()}
      </span>
    </li>
  );
};

export default BetItem;
