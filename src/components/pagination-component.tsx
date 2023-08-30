import React, { FC } from "react";

const ElementRenderer = (
  numberOfElements: number,
  currentPage: number,
  setCurrentPage: (value: React.SetStateAction<number>) => void
) => {
  const elements = [];

  for (let i = 0; i < numberOfElements; i++) {
    elements.push(
      <a
        href="#"
        className={` ${
          currentPage === i + 1
            ? "relative z-10 inline-flex items-center bg-purple-500 px-3 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            : `relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-2 ring-inset ring-gray-400 focus:z-20 focus:outline-offset-0 hover:bg-gray-200 ${
                numberOfElements > 5 &&
                (i + 1 <= currentPage - 3 || i + 1 >= currentPage + 3) &&
                "hidden xl:inline-flex"
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
    <div className="flex flex-col md:flex-row items-end md:justify-between">
      <p className="font-bold mt-3">
        Page {currentPage} of {totalPages}
      </p>
      <div className="inline-flex -space-x-px text-sm mt-3">
        <a
          onClick={() => setCurrentPage(1)}
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          I
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.21214 7.45579L10.0789 1.2253C10.3618 0.9249 10.8206 0.9249 11.1035 1.2253L11.7878 1.95209C12.0704 2.25217 12.0707 2.7382 11.789 3.03892L7.13935 7.99984L11.7887 12.9611C12.0707 13.2618 12.0701 13.7478 11.7875 14.0479L11.1032 14.7747C10.8203 15.0751 10.3615 15.0751 10.0786 14.7747L4.21214 8.54389C3.92929 8.24349 3.92929 7.75619 4.21214 7.45579Z"
              fill="black"
            />
          </svg>
        </a>
        <a
          onClick={handlePrevPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.21214 7.45579L10.0789 1.2253C10.3618 0.9249 10.8206 0.9249 11.1035 1.2253L11.7878 1.95209C12.0704 2.25217 12.0707 2.7382 11.789 3.03892L7.13935 7.99984L11.7887 12.9611C12.0707 13.2618 12.0701 13.7478 11.7875 14.0479L11.1032 14.7747C10.8203 15.0751 10.3615 15.0751 10.0786 14.7747L4.21214 8.54389C3.92929 8.24349 3.92929 7.75619 4.21214 7.45579Z"
              fill="black"
            />
          </svg>
        </a>
        {ElementRenderer(totalPages, currentPage, setCurrentPage)}
        <a
          onClick={handleNextPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.7878 8.54407L5.92106 14.7746C5.63811 15.0751 5.17938 15.0751 4.89646 14.7746L4.2122 14.0479C3.92974 13.748 3.9292 13.2618 4.211 12.9611L8.8605 7.99998L4.211 3.03892C3.9292 2.73823 3.92974 2.25205 4.2122 1.95207L4.89646 1.22537C5.17941 0.924876 5.63814 0.924876 5.92106 1.22537L11.7878 7.45593C12.0707 7.75639 12.0707 8.24357 11.7878 8.54407Z"
              fill="black"
            />
          </svg>
        </a>
        <a
          onClick={() => setCurrentPage(totalPages)}
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-2 font-bold ring-inset ring-gray-400 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.7878 8.54407L5.92106 14.7746C5.63811 15.0751 5.17938 15.0751 4.89646 14.7746L4.2122 14.0479C3.92974 13.748 3.9292 13.2618 4.211 12.9611L8.8605 7.99998L4.211 3.03892C3.9292 2.73823 3.92974 2.25205 4.2122 1.95207L4.89646 1.22537C5.17941 0.924876 5.63814 0.924876 5.92106 1.22537L11.7878 7.45593C12.0707 7.75639 12.0707 8.24357 11.7878 8.54407Z"
              fill="black"
            />
          </svg>
          I
        </a>
      </div>
    </div>
  );
};

export default PaginationComponent;
