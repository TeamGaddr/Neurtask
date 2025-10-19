import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-lg p-2">
      <input
        type="text"
        placeholder="Search Team Workspace"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
};

export default SearchBar;
