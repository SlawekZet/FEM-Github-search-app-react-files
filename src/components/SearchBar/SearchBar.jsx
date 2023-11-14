/* eslint-disable react/prop-types */

import { useState } from "react";

export const SearchBar = ({ isUserFound, handleUsernameUpdate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    {
      !inputValue ? alert("insert username") : handleUsernameUpdate(inputValue);
    }
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <form className="search-bar-input">
          <img
            src="./icon-search.svg"
            alt="ison of a spyglass"
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search GitHub username..."
            className="search-bar-input-field"
            value={inputValue}
            onChange={handleChange}
          />
          {!isUserFound ? <p className="error">No Results</p> : null}
          <input
            type="submit"
            onClick={handleSearchClick}
            className="search-button"
            value="Search"
          />
        </form>
      </div>
    </>
  );
};
