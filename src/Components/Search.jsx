import { useState } from "react";
import { SearchIcon } from "../Utils/icons/HomeIcon";

function Search({ width, style, targetRef, query, handleQuery }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="search-container" style={{ position: "relative", width }}>
      <input
        ref={targetRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search here..."
        value={query}
        onChange={handleQuery}
        type="text"
        className="search"
        style={{ ...style, width: "100%" }}
      />
      {/* <SearchIcon
        size={isFocused ? "30px" : "24px"}
        className="search-icon"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          transition: "size 0.3s ease",
        }}
      /> */}
    </div>
  );
}

export default Search;
