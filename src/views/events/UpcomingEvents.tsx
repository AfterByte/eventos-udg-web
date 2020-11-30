import React, { useContext, useEffect, useRef, useState } from "react";
// Custom components
import SideBar from "../../components/SideBar";
import EventCard from "../../components/cards/UpcomingEventCard";
import Header from "../../components/Header";
import TaskBar from "../../components/TaskBar";
// Helpers and payloads
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
import { upcomingEvents } from "../../helpers/apiClient";
import { Event } from "../../helpers/payloads";
import { typeOf } from "../../helpers/validationFunctions";

const UpcomingEvents = () => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [events, setEvents] = useState<Event[]>([]);
  const firstUpdate = useRef(true);

  const getEvents = async () => {
    const response = await upcomingEvents(apiClient);
    // console.log(response);
    if (response.status === 204) setEvents([]);
    else if (
      response.body &&
      typeOf<{ events: Event[] }>("events", response.body)
    )
      setEvents(response.body.events);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getEvents();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 flex flex-col">
        <Header barTitle="Próximos eventos" />
        <TaskBar />
        <div className="gap-4 m-4 grid lg:grid-cols-12 grid-cols-1">
          {events.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UpcomingEvents;
