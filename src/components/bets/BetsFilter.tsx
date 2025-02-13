import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchBets } from "../../store/betSlice";

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
  const [status, setStatus] = useState(currentStatus || "");

  const totalPages = Math.ceil(total / limit);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    dispatch(
      fetchBets({ page: 1, limit, status: e.target.value || undefined })
    );
  };

  const goToPage = (page: number) => {
    dispatch(fetchBets({ page, limit, status: status || undefined }));
  };

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <label className="mr-2 text-sm font-semibold">Filter by status:</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="rounded border-gray-300 p-1"
        >
          <option value="">All</option>
          <option value="win">Win</option>
          <option value="lost">Lost</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Simple Pagination */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BetsFilter;
