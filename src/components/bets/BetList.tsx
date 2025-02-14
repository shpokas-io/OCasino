import React from "react";
import BetItem from "./BetItem";

export interface Bet {
  id: string;
  amount: number | { amount: number; userChoice?: string };
  status: string;
  userChoice?: string;
}

interface BetListProps {
  bets: Bet[];
}

const BetList: React.FC<BetListProps> = ({ bets }) => {
  return (
    <ul className="space-y-2">
      {bets.map((bet) => (
        <BetItem
          key={bet.id}
          amount={bet.amount}
          status={bet.status}
          userChoice={bet.userChoice}
        />
      ))}
    </ul>
  );
};

export default BetList;
