import React, { useState } from "react";
// Assets
import Sort from "../../assets/icons/sort-black.svg";

type OrderByProps = {
  className?: string;
  options?: { name: string; behavior(): void | Promise<void> }[];
};

export const OrderBy = ({ options, className }: OrderByProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const opts = options?.map((option) => (
    <button
      onClick={option.behavior}
      className="border block px-6 py-2 hover:bg-indigo-500 hover:text-white w-full"
    >
      {option.name}
    </button>
  ));

  return (
    <div className={className}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-2 mx-3 font-normal text-white bg-blue-500 rounded-md items-center flex"
      >
        <p className="hidden md:block text-lg mr-2">Ordenar por</p>
        <img
          className="h-6"
          style={{ filter: "invert(100%)" }}
          src={Sort}
          alt={"SortIcon"}
        />
      </button>
      {showOptions ? (
        <div className="absolute text-center bg-white border mt-3 md:mt-5">
          {opts}
        </div>
      ) : null}
    </div>
  );
};
export default OrderBy;
