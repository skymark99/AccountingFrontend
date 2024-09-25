import React from "react";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="button"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className="prev-icon-span">
          <TbPlayerTrackPrev className="icons" />
        </span>
        Previous
      </button>
      <ul className="page-numbers">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? "current" : ""}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        className="button"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
        <span className="next-icon-span">
          <TbPlayerTrackNext className="icons" />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
