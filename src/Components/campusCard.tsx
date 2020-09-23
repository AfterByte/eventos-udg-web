import React from "react";

interface props{
  id: number, 
  name: string, 
  campus: string,
  image: string
  onClick: any
}

export default function campusCard(props:props) {
  return (
    <button onClick={(e) => props.onClick(props.id)} className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
      <div className="pl-4">
        <p className="font-medium text-xl sm:text-2xl">{props.name}</p>
        <p className="font-base text-md sm:text-xl">Sede: {props.campus}</p>
      </div>
    </button>
  );
}
