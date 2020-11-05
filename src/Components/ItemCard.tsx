import React from "react";
import { Event } from "../helpers/payloads";
import { events } from "../helpers/mockData";
import ticketGirl from "../Images/ticketGirl.jpeg";
import qr from "../Images/qr.svg";
interface ItemProps {
  ticket: Event;
  setShownItem(ticket: Event): void;
}

const ItemCard = ({ ticket, setShownItem }: ItemProps) => {
  return (
    <button
      onClick={() => setShownItem(ticket)}
      className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
    >
      <div className="pl-4 flex">
        <div>
          <p>
            <img className="w-32 m-4 " src={ticketGirl} alt="" />
          </p>
        </div>
        <div className="ml-8 mt-4">
          <p className="font-normal font-sans text-3xl sm:text-2xl">
            {ticket.name}
          </p>
          <p className="font-light text-xl ">
            Presentado por: {ticket.organizer.name}
          </p>
          <div className="flex">
            <p className="font-light text-md text-red-600 sm:text-xl">
              18/Julio/2020 07:35 pm {/* {ticket.reservation.start.getDate} */}
            </p>
            <p className="font-sans text-xl font-light ml-4">
              Ubicación: {ticket.reservation.location.name}
            </p>
          </div>
        </div>
        <div>
          <p>
            <img src={qr} alt="" className="w-32 ml-20" />
          </p>
        </div>
      </div>
    </button>
  );
};
export default ItemCard;
