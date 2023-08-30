import React from "react";

const LoadingComponent = () => {
  const piece = [1, 2, 3];

  return (
    <>
      {piece.map((item) => (
        <div
          key={item}
          className="animate-pulse bg-white shadow-lg m-4 rounded-lg w-full md:w-1/3 lg:w-1/4"
        >
          <div className="w-full h-36 bg-gray-200 rounded-t-lg"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded-lg w-24 mb-3 mt-2"></div>
            <div className="h-5 bg-gray-300 rounded-lg w-full mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-lg  w-full mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-lg  w-full mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-lg  w-48 mb-3"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingComponent;
