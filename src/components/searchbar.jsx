import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={() => onSearch(query)}>Go</button>
    </div>
  );
};

export default SearchBar;