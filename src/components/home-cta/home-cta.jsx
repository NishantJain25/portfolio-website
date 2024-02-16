import React from "react";
import "./home-cta.css";
import { IoMdArrowForward } from "react-icons/io";

const HomeCTA = ({
  line1,
  line1alt,
  line2,
  line2alt,
  handleMouseEnter,
  handleMouseLeave,
  onClick
}) => {

  return (
    <div
      className="cta flex flex-col items-start relative z-1 p-4 cursor-pointer select-none"
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={handleMouseLeave}
      onClick = {onClick}
    >
      <div className="overflow-hidden relative text-left lg:h-[50px] h-[20px]">
        <p className={`line1 z-0 `}>{line1}</p>
        <p className={`line1alt z-0 `}>{line1alt}</p>
      </div>
      <div className="overflow-hidden text-left lg:h-[50px] h-[20px]">
        <p className={`line2 z-0 `}>{line2}</p>
        <p className={`line2alt z-0 `}>{line2alt}</p>
      </div>
      <div className="rotate-[-45deg] absolute top-0 right-[-5px]">
        <IoMdArrowForward />
      </div>
    </div>
  );
};

export default HomeCTA;
