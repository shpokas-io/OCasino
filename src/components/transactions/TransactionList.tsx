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
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className="flex flex-col py-2 sm:flex-row sm:items-center sm:justify-between text-gray-700 dark:text-gray-200"
        >
          <div>
            <span className="font-medium">ID:</span> {tx.id}
          </div>
          <div>
            <span className="font-medium">Date:</span>{" "}
            {format(new Date(tx.createdAt), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div>
            <span className="font-medium">Type:</span> {tx.type.toUpperCase()}
          </div>
          <div>
            <span className="font-medium">Amount:</span> €{tx.amount.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
