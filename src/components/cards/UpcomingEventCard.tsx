import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Assets
import ScheduleIcon from "../../assets/icons/schedule-black.svg";
import { getImage } from "../../helpers/apiClient";
// Helpers and payload types
import { Attachment, Event } from "../../helpers/payloads";
import { formatDate, parseFullName } from "../../helpers/validationFunctions";
import { AuthContext, AuthProviderPayload } from "../AuthProvider";

interface UpcomingEventcardProps {
  event: Event;
}

const UpcomingEventcard = ({ event }: UpcomingEventcardProps) => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [image, setImage] = useState("");

  const firstUpdate = useRef(true);

  const fetchImage = async (attachment?: Attachment) => {
    if (attachment) {
      const response = await getImage(apiClient, attachment);
      if (response.status === 200 && response.body) setImage(response.body.url);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      fetchImage(event.image);
      firstUpdate.current = false;
    }
  });

  return (
    <Link
      to={`/events/${event.id}`}
      className="cardSpam col-span-1 flex lg:flex-col lg:col-span-6 xl:col-span-4 bg-white rounded shadow-md"
    >
      <img
        className="w-24 h-24 m-4 lg:m-0 lg:w-full lg:h-48 object-cover hidden sm:block rounded lg:rounded-b-none"
        id="img"
        src={image}
        alt="Event"
      ></img>
      <div className="p-4 flex-grow">
        <div className="flex">
          <p className="text-xl xl:text-2xl truncate">{event.name}</p>
          <p className="flex-shrink-0 text-red-500 text-lg xl:text-xl ml-auto">
            {event.capacity > 0
              ? `${event.enrolled}/${event.capacity}`
              : "Público abierto"}
          </p>
        </div>
        <p className="text-lg xl:text-xl">
          {event.guests.length > 0
            ? `Presentando a ${parseFullName(event.guests[0])}`
            : `Organizado por ${parseFullName(event.organizer)}`}
        </p>
        <div className=" flex items-center">
          <img className="h-6 mr-2" src={ScheduleIcon} alt={"ScheduleIcon"} />
          <p className="font-normal text-lg xl:text-xl">
            {formatDate(new Date(event.reservation.start))}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default UpcomingEventcard;
