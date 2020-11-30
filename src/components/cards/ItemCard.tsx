import React from "react";
import { Item } from "../../helpers/payloads";
interface ItemCardProps {
  item: Item;
  setShownItem(item: Item): void;
}

export default function ItemCard({ item, setShownItem }: ItemCardProps) {
  return (
    <button
      onClick={() => setShownItem(item)}
      className="px-4 py-8 mb-4 w-full bg-white shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
    >
      <p className="font-medium text-xl sm:text-2xl">{item.name}</p>
      <p className="font-base text-md sm:text-xl">
        {item.countable ? "Objeto contable" : "Objecto no contable"}
      </p>
    </button>
  );
}
