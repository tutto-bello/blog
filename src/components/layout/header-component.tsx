import React from "react";

const HeaderComponent = () => {
  return (
    <div className="relative flex w-full items-center justify-between bg-white py-4 px-3 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200">
      <div className="container mx-auto">
        <h2 className="font-bold text-white">
          BLOG search and filter with pagination
        </h2>
      </div>
    </div>
  );
};

export default HeaderComponent;
