import React from "react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className="flex flex-col py-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="text-gray-700">
            <span className="font-medium">ID:</span> {tx.id}
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Date:</span>{" "}
            {format(new Date(tx.createdAt), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Type:</span> {tx.type.toUpperCase()}
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Amount:</span> €{tx.amount.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
