import React, { useEffect, useState } from "react";
// Custom components
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
// Payload types
import { Event, Reservation } from "../../helpers/payloads";
// Helpers
import { dateToIso } from "../../helpers/validationFunctions";

interface ReservationCalendarProps {
  reservation?: Reservation;
  events?: Event[];
  hide(): void | Promise<void>;
  confirmAction(start: string, end: string): void | Promise<void>;
}

const ReservationCalendar = ({
  reservation,
  events,
  hide,
  confirmAction,
}: ReservationCalendarProps) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const clickDate = ({ dateStr, date }: DateClickArg) => {
    dateStr = dateStr.split("-").join("/");
    if (!start) setStart(dateStr);
    else if (!end && date >= new Date(start)) setEnd(dateStr);
    else {
      setStart(dateStr);
      setEnd("");
    }
  };

  const selectDate = ({ startStr, endStr }: DateSelectArg) => {
    setStart(startStr.split("-").join("/"));
    setEnd(endStr.split("-").join("/"));
  };

  useEffect(() => {
    setStart(dateToIso(reservation?.start));
    setEnd(dateToIso(reservation?.end));
  }, [reservation]);

  return (
    <div className="absolute top-0 bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <div className="bg-white rounded p-4 m-4 mx-auto md:p-8 flex flex-col overflow-auto">
        <p className="text-center text-2xl mx-16">
          Seleccione un rango de fechas
        </p>
        <p className="text-lg mb-4">
          Rango seleccionado:
          <span className="font-bold text-red-500">
            {`
              ${start.split("/").reverse().join("/")}
              ${end && "-"} 
              ${end.split("/").reverse().join("/")}
            `}
          </span>
        </p>
        <FullCalendar
          dateClick={clickDate}
          select={selectDate}
          selectMinDistance={2}
          events={events?.map((event) => ({
            title: event.name,
            start: event.reservation.start,
            end: event.reservation.end,
            id: event.id,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          }))}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          buttonText={{ today: "Hoy" }}
          selectable={true}
        />
        <div className="flex mx-auto">
          <button
            onClick={() => {
              confirmAction(start, end);
              hide();
            }}
            disabled={!(start && end)}
            className={`${
              start && end
                ? "bg-teal-600 transition duration-500 ease-in-out transform hover:-translate-y-1"
                : "bg-gray-600 cursor-not-allowed"
            } mt-4 mr-8 block p-2 px-6 text-white rounded-md shadow-sm`}
          >
            Confirmar reservación
          </button>
          <button
            onClick={hide}
            className="lg:mx-auto mt-4 block p-2 px-6 text-white bg-gray-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReservationCalendar;
