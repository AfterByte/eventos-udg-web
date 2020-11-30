import React from "react";
import { Campus } from "../../helpers/payloads";

interface CampusCardProps {
  campus: Campus;
  setShownCampus(campus: Campus): void;
}

const CampusCard = ({ campus, setShownCampus }: CampusCardProps) => {
  return (
    <button
      onClick={() => setShownCampus(campus)}
      className="px-4 py-8 mb-4 w-full bg-white shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
    >
      <p className="font-medium text-xl sm:text-2xl">{campus.name}</p>
      <p className="font-base text-md sm:text-xl">Sede: {campus.city}</p>
    </button>
  );
};
export default CampusCard;
