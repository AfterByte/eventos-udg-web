import React, { useState } from "react";
// custom Components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import ProgresiveBar from "../../components/elements/ProgresiveBar";
import LocationPicker from "../../components/forms/LocationPicker";
import EventForm from "../../components/forms/EventForm";
// Payload types
import { Reservation } from "../../helpers/payloads";

export default function CreateEvent() {
  const [reservation, setReservation] = useState<Reservation>();
  const [current, setCurrent] = useState(0);

  const sections = [
    { name: "Reservar ubicación", next: reservation !== undefined },
    { name: "Información del evento", next: true },
  ];

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Crear evento" />
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
          <EventForm reservation={reservation} />
        )}
      </div>
    </div>
  );
}
