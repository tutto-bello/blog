import React, { FC } from "react";

const PaginationComponent: FC<{
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
}> = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex justify-between">
      <p className="font-bold">
        Page {currentPage} of {totalPages}
      </p>
      <div className="inline-flex -space-x-px text-sm">
        <a
          onClick={handlePrevPage}
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          Previous
        </a>
        <a
          onClick={handleNextPage}
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default PaginationComponent;
