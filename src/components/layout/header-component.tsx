import React from "react";
import { useRouter } from "next/router";

const HeaderComponent = () => {
  const router = useRouter();

  return (
    <div className="relative flex w-full items-center justify-between bg-white py-4 px-3 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200">
      <div className="container mx-auto">
        <button
          onClick={() => router.push("/")}
          className="font-bold text-white"
        >
          {router.pathname.includes("post") ? "Back to search" : "BLOG"}
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
