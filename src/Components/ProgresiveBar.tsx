import React, { Component } from "react";

interface ProgresProps {
  progressTitle: string;
}

const ProgresiveBar = ({ progressTitle }: ProgresProps) => {
  return (
    <div>
      <div className="mt-4 col-start-2 col-end-7 grid xl:grid-cols-2 md:grid-cols-2 grid-cols-2 shadow-md text-center md:w-auto max-h-auto items-center py-2 sm:py-5 bg-white">
        <div className="text-center font-medium text-2xl md:text-right flex justify-between">
          <button></button>
          <p>{progressTitle}</p>
        </div>
      </div>
    </div>
  );
};
export default ProgresiveBar;
