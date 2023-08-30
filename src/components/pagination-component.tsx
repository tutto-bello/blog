import React, { FC } from "react";
import RightArrowIcon from "../../public/assets/right-arrow-icon";
import LeftArrowIcon from "../../public/assets/left-arrow-icon";

const ElementRenderer = (
  numberOfPages: number,
  currentPage: number,
  setCurrentPage: (value: React.SetStateAction<number>) => void
) => {
  const elements = [];

  for (let i = 0; i < numberOfPages; i++) {
    elements.push(
      <a
        href="#"
        className={` ${
          currentPage === i + 1
            ? "relative z-10 inline-flex items-center bg-purple-500 px-3 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            : `relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-2 ring-inset ring-gray-400 focus:z-20 focus:outline-offset-0 hover:bg-purple-200 ${
                numberOfPages > 5 &&
                (i + 1 <= currentPage - 3 || i + 1 >= currentPage + 3) &&
                "hidden"
              }`
        }`}
        key={i}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </a>
    );
  }

  return <div>{elements}</div>;
};

const PaginationComponent: FC<{
  resultsNumber: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
}> = ({ resultsNumber, currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col md:flex-row items-end md:justify-between">
      <p className="font-bold mt-3">
        Result: {resultsNumber} Page {currentPage} of {totalPages}
      </p>
      <div className="inline-flex -space-x-px text-sm mt-3">
        <a
          onClick={() => setCurrentPage(1)}
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-purple-200 focus:z-20 focus:outline-offset-0"
        >
          I
          <LeftArrowIcon />
        </a>
        <a
          onClick={handlePrevPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-purple-200 focus:z-20 focus:outline-offset-0"
        >
          <LeftArrowIcon />
        </a>
        {ElementRenderer(totalPages, currentPage, setCurrentPage)}
        <a
          onClick={handleNextPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-purple-200 focus:z-20 focus:outline-offset-0"
        >
          <RightArrowIcon />
        </a>
        <a
          onClick={() => setCurrentPage(totalPages)}
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-purple-200 focus:z-20 focus:outline-offset-0"
        >
          <RightArrowIcon />I
        </a>
      </div>
    </div>
  );
};

export default PaginationComponent;
