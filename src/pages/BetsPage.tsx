import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchBets } from "../store/betSlice";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import BetForm from "../components/bets/BetForm";
import BetsFilter from "../components/bets/BetsFilter";
import BetsList from "../components/bets/BetList";

const BetsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bets, loading, error, page, limit, total } = useSelector(
    (state: RootState) => state.bets
  );

  useEffect(() => {
    dispatch(fetchBets({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <NavBar />
      <div className="mx-auto w-full max-w-4xl flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Betting Page</h1>
        </div>

        <div className="mb-8 rounded-md bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Place a Bet
          </h2>
          <BetForm />
        </div>

        <div className="mb-4">
          <BetsFilter
            currentStatus={""}
            currentPage={page}
            limit={limit}
            total={total}
          />
        </div>

        <div className="rounded-md bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">All Bets</h2>
          {loading && <p className="text-gray-500">Loading your bets...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && bets.length === 0 && (
            <p className="text-gray-500">No bets found.</p>
          )}
          {!loading && !error && bets.length > 0 && <BetsList bets={bets} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BetsPage;
