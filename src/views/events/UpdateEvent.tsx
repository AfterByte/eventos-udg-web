import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// custom Components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import ProgresiveBar from "../../components/elements/ProgresiveBar";
import LocationPicker from "../../components/forms/LocationPicker";
import EventForm from "../../components/forms/EventForm";
// Payload types
import { Event, Reservation } from "../../helpers/payloads";
// Helpers
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
import { getEvent } from "../../helpers/apiClient";
import { typeOf } from "../../helpers/validationFunctions";

export default function UpdateEvent() {
  // Context
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  // States
  const [event, setEvent] = useState<Event>();
  const [reservation, setReservation] = useState<Reservation>();
  const [current, setCurrent] = useState(0);

  const sections = [
    { name: "Reservar ubicación", next: reservation !== undefined },
    { name: "Información del evento", next: true },
  ];

  const findEvent = async () => {
    const response = await getEvent(apiClient, id);
    if (response.status < 300) {
      if (typeOf<Event>("id", response.body)) {
        setEvent(response.body);
        setReservation(response.body.reservation);
      }
    } else console.log(response);
  };

  useEffect(() => {
    if (!event) findEvent();
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Editar evento" />
        <ProgresiveBar
          setCurrentSection={setCurrent}
          currentSection={current}
          sections={sections}
        />
        {current === 0 && (
          <LocationPicker
            reservation={reservation}
            setReservation={(r) => {
              setReservation(r);
              setCurrent(1);
            }}
          />
        )}
        {current === 1 && reservation && (
          <EventForm reservation={reservation} event={event} />
        )}
      </div>
    </div>
  );
}
