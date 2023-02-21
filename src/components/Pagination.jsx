import React from "react";
import arrow from "../images/arrow.png";
import { useState } from "react";

const Pagination = ({ setCurrentPage, currentPage, data }) => {
  const [number, setNumber] = useState(1);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage <= data) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="my-10 flex justify-between pb-20 w-full">
      <button
        className="border border-pri px-3 py-2 flex items-center gap-2"
        onClick={previousPage}
      >
        <div>
          <img
            src={arrow}
            alt="arrow up"
            className=" -rotate-90 rounded-full w-[10px] h-[12.5px] object-contain "
          />
        </div>
        Prev
      </button>
      {currentPage}
      <button
        className="border border-pri px-3 py-2 gap-2 flex items-center"
        onClick={nextPage}
      >
        Next
        <div>
          <img
            src={arrow}
            alt="arrow up"
            className="rotate-90 rounded-full w-[10px] h-[12.5px] object-contain "
          />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
