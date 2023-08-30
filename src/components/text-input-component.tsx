import React, { FC } from "react";

const TextInputComponent: FC<{
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Search by title:</h2>
      <input
        type="text"
        id="search"
        className="appearance-none rounded-lg border-gray-400 bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-md border-2 focus:border-purple-600 hover:border-purple-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Type here"
      />
    </div>
  );
};

export default TextInputComponent;
