import React, { useContext, useEffect, useRef, useState } from "react";
// Helpers and payloads
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
import { Attachment, Event } from "../../helpers/payloads";
import { getImage } from "../../helpers/apiClient";
import { formatDate, parseFullName } from "../../helpers/validationFunctions";

interface EventCardProps {
  event: Event;
  setShownEvent(event: Event, image: string): void;
}

const EventCard = ({ event, setShownEvent }: EventCardProps) => {
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
    <button
      onClick={() => {
        setShownEvent(event, image);
      }}
      className="flex p-4 mb-4 w-full bg-white shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
    >
      <img
        className="hidden md:block w-24 h-24 mr-4 object-cover"
        src={image}
        alt="Event"
      />
      <div>
        <p className="font-medium text-xl md:text-2xl">{event.name}</p>
        <p className="font-base text-md sm:text-xl">
          {event.guests.length > 0
            ? `Presentando a ${parseFullName(event.guests[0])}`
            : `Organizado por ${parseFullName(event.organizer)}`}
        </p>
        <div className="flex">
          <p className="font-light text-md text-red-600 sm:text-xl">
            {formatDate(new Date(event.reservation.start))}
          </p>
          <p className="font-light text-md sm:text-xl ml-4">
            Ubicación: {event.reservation.location.name}
          </p>
        </div>
      </div>
    </button>
  );
};
export default EventCard;
