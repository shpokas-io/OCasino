import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";
import {
  fetchTransactions,
  setTransactionPage,
  setFilterType,
  setFilterId,
  selectTransactionsState,
} from "../store/transactionSlice";
import TransactionList from "../components/transactions/TransactionList";
import Pagination from "../components/Pagination";

const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    transactions,
    total,
    page,
    limit,
    loading,
    error,
    filterType,
    filterId,
  } = useSelector(selectTransactionsState);

  useEffect(() => {
    dispatch(
      fetchTransactions({
        page,
        limit,
        type: filterType || undefined,
        id: filterId || undefined,
      })
    );
  }, [dispatch, page, limit, filterType, filterId]);

  const totalPages = Math.ceil(total / limit);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTransactionPage(1));
    dispatch(setFilterType(e.target.value));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTransactionPage(1));
    dispatch(setFilterId(e.target.value));
  };

  const onPageChange = (newPage: number) => {
    dispatch(setTransactionPage(newPage));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <NavBar />
      <div className="mx-auto w-full max-w-4xl flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
        </div>
        <div className="mb-4 rounded-md bg-white p-4 shadow">
          <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={handleTypeChange}
                className="rounded border-gray-300 p-2"
              >
                <option value="">All</option>
                <option value="bet">Lost</option>
                <option value="win">Win</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">
                Filter by ID
              </label>
              <input
                type="text"
                value={filterId}
                onChange={handleIdChange}
                className="rounded border-gray-300 p-2"
                placeholder="Transaction ID"
              />
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <div className="rounded-md bg-white p-4 shadow">
          {loading && <p className="text-gray-500">Loading transactions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && transactions.length === 0 && (
            <p className="text-gray-500">No transactions found.</p>
          )}
          {!loading && !error && transactions.length > 0 && (
            <TransactionList transactions={transactions} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransactionsPage;
