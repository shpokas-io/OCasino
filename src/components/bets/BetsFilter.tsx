import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchBets } from "../../store/betSlice";
import Pagination from "../Pagination";

interface BetsFilterProps {
  currentStatus?: string;
  currentPage: number;
  limit: number;
  total: number;
}

const BetsFilter: React.FC<BetsFilterProps> = ({
  currentStatus,
  currentPage,
  limit,
  total,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState(currentStatus ?? "");
  const totalPages = Math.ceil(total / limit);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    dispatch(
      fetchBets({ page: 1, limit, status: e.target.value || undefined })
    );
  };

  const onPageChange = (page: number) => {
    dispatch(fetchBets({ page, limit, status: status || undefined }));
  };

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <label className="mr-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Filter by status:
        </label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="rounded border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <option value="">All</option>
          <option value="win">Win</option>
          <option value="lost">Lost</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BetsFilter;
