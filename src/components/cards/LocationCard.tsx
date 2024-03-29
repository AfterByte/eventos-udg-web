import React from "react";
import { Location, Without } from "../../helpers/payloads";

interface LocationCardProps {
  location: Without<Location, "campuses">;
  setShownLocation(location: Without<Location, "campuses">): void;
}

export default function LocationCard({
  location,
  setShownLocation,
}: LocationCardProps) {
  return (
    <button
      onClick={() => setShownLocation(location)}
      className="p-4 mb-4 w-full bg-white shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
    >
      <p className="font-medium text-xl md:text-2xl">{location.name}</p>
      <p className="font-base text-md sm:text-xl">{location.address}</p>
      <p className="font-base text-sm sm:text-sm mt-2">
        Capacidad: {location.max_capacity} personas
      </p>
    </button>
  );
}
