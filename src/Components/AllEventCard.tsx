import React, { useEffect, useState } from "react";
import { Event } from "../helpers/payloads";
import ticketGirl from "../Images/ticketGirl.jpeg";

/**IMPORT QR CODE GENERATE */
import QRCode from "qrcode";

interface EventCardProps {
  Events: Event;
  setShownEvent(events: Event): void;
}

const AllEventCard = ({ Events, setShownEvent }: EventCardProps) => {
  /**QR GENERATE CODE */
  const [url, setUrl] = useState("");
  async function generateQR() {
    const url = await QRCode.toDataURL(Events.id);
    setUrl(url);
  }

  useEffect(() => {
    if (!url) generateQR();
  });

  return (
    <button
      onClick={() => setShownEvent(Events)}
      className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
    >
      <div className="pl-4 flex">
        <div>
          <p>
            <img className="w-32 m-4 " src={ticketGirl} alt="" />
          </p>
        </div>
        <div className="ml-8 mt-4">
          <p className="font-normal font-sans text-3xl sm:text-base">
            {Events.name}
          </p>
          <p className="font-light text-xl ">
            Presentado por: {Events.organizer.name}
          </p>
          <div className="flex">
            <p className="font-light text-md text-red-600 sm:text-xl">
              18/Julio/2020 07:35 pm {/* {ticket.reservation.start.getDate} */}
            </p>
            <p className="font-sans text-xl font-light ml-4">
              Ubicación: {Events.reservation.location.name}
            </p>
          </div>
        </div>
        <div>
          <a href={url} download>
            <p>
              <img src={url} alt="" className="w-32 ml-20" />
            </p>
          </a>
        </div>
      </div>
    </button>
  );
};
export default AllEventCard;
