import React from "react";
import { Item } from "../helpers/payloads";
interface ItemCardProps {
  items: Item;
  setShownItem(items: Item): void;
}

export default function ItemCard({ items, setShownItem }: ItemCardProps) {
  return (
    <button
      onClick={() => setShownItem(items)}
      className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
    >
      <div className="pl-4">
        <p className="font-medium text-xl sm:text-2xl">{items.name}</p>
      </div>
    </button>
  );
}
