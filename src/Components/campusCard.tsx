import React from "react";
import { Campus } from "../helpers/payloads";

interface CampusCardProps {
  campus: Campus;
  setShownCampus(campus: Campus): void;
}

export default function campusCard({
  campus,
  setShownCampus,
}: CampusCardProps) {
  return (
    <button
      onClick={() => setShownCampus(campus)}
      className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
    >
      <div className="pl-4">
        <p className="font-medium text-xl sm:text-2xl">{campus.name}</p>
        <p className="font-base text-md sm:text-xl">Sede: {campus.city}</p>
      </div>
    </button>
  );
}
