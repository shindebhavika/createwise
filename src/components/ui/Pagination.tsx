import React, { useState, ChangeEvent, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  onPageChange?: (page: number) => void; // optional callback when page changes
  onEntriesChange?: (entries: number) => void; // optional callback when entries per page changes
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  onPageChange,
  onEntriesChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);

  const [inputPage, setInputPage] = useState<string>("1"); // local input state

  const totalPages = Math.max(1, Math.ceil(totalItems / entriesPerPage));

  // Sync input field when currentPage changes from other controls (prev/next, entries per page change)
  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleEntriesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setEntriesPerPage(value);
    setCurrentPage(1); // reset to first page on entries change
    onEntriesChange && onEntriesChange(value);
    onPageChange && onPageChange(1);
  };

  // Update local input value immediately for smooth typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  // On blur or Enter key, validate and update page state
  const handleInputBlur = () => {
    let value = Number(inputPage);
    if (isNaN(value) || value < 1) value = 1;
    else if (value > totalPages) value = totalPages;

    setCurrentPage(value);
    // onPageChange && onPageChange(value);
    setInputPage(value.toString());
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur(); // triggers onBlur
    }
  };

  return (
    <div className="flex items-center justify-evenly gap-10 font-semibold">
     

      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select
          value={entriesPerPage}
          onChange={handleEntriesChange}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span>Entries per page</span>
      </div>

      <div className="flex items-center space-x-2">
        <span>Page</span>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          min={1}
          max={totalPages}
          className="border rounded w-16 px-2 py-1 text-center"
        />
        <span>/ {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
