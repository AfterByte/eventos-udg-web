import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// Context imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
// Payload types import
import { Event, Location, Reservation, Without } from "../../helpers/payloads";
// Custom components
import TaskBar from "../TaskBar";
import ReservationCalendar from "../elements/ReservationCalendar";
import LocationCard from "../../components/cards/LocationCard";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
// API Client & helpers
import { indexLocations, locationEvents } from "../../helpers/apiClient";
import { typeOf } from "../../helpers/validationFunctions";

type LocationPickerProps = {
  reservation?: Reservation;
  setReservation(reservation: Reservation): void;
};

const LocationPicker = ({
  reservation,
  setReservation,
}: LocationPickerProps) => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [locations, setLocations] = useState<Without<Location, "campuses">[]>(
    []
  );
  const [showCalendar, setShowCalendar] = useState(reservation !== undefined);
  const [shownLocation, setShownLocation] = useState<
    Without<Location, "campuses">
  >();
  const [events, setEvents] = useState<Event[]>();

  const firstUpdate = useRef(true);
  const history = useHistory();

  const getLocations = async () => {
    const response = await indexLocations(apiClient);
    if (response.status === 204) setLocations([]);
    else if (
      response.body &&
      typeOf<{ locations: Without<Location, "campuses">[] }>(
        "locations",
        response.body
      )
    )
      setLocations(response.body.locations);
  };

  const getEvents = async (location: Location) => {
    const response = await locationEvents(apiClient, location.id, {
      preset: "upcoming",
    });
    if (response.status === 204) setEvents([]);
    else if (
      response.body &&
      typeOf<{ events: Event[] }>("events", response.body)
    )
      setEvents(response.body.events);
  };

  const setLocation = (location: Location) => {
    getEvents(location);
    setShownLocation(location);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      if (reservation) {
        setShownLocation(reservation.location);
        getEvents(reservation.location);
      }

      getLocations();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <TaskBar />
      <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              setShownLocation={setLocation}
            />
          ))}
        </div>

        <div className="xl:col-span-5 overflow-auto">
          {/* Location preview */}
          {shownLocation && (
            <div>
              <div className="p-4 bg-white text-center xl:m-8 mb-0 xl:p-8">
                <p className="text-lg md:text-xl font-bold">
                  {shownLocation.name}
                </p>
                <p className="md:text-base font-bold text-red-500 md:mt-2">
                  {shownLocation.city}
                </p>
                <p className="md:text-base text-red-500 md:mt-2">
                  {shownLocation.address}
                </p>
                <p className="md:text-base mt-2">
                  Capacidad: {shownLocation.max_capacity} personas
                </p>
                {!shownLocation.third_party ? (
                  <p className="hidden md:block text-sm xl:text-base md:mt-6">
                    Esta ubicación es administrada por Eventos UDG
                  </p>
                ) : (
                  <p className="hidden md:block text-sm xl:text-base md:mt-6">
                    Esta ubicación no es administrada por Eventos UDG
                  </p>
                )}
                <div className="flex xl:flex-col xl:mt-4 justify-center">
                  <button
                    onClick={() => {
                      setShowCalendar(true);
                    }}
                    className="xl:mx-auto xl:text-lg block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                  >
                    Hacer reservación
                  </button>
                </div>
              </div>
              <div className="hidden xl:block p-4 bg-white text-center xl:m-8 flex-grow">
                <FullCalendar
                  plugins={[listPlugin]}
                  initialView="listWeek"
                  events={events?.map((event) => ({
                    title: event.name,
                    start: event.reservation.start,
                    end: event.reservation.end,
                    id: event.id,
                    color: `#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`,
                  }))}
                  noEventsText="No hay eventos durante la semana seleccionada"
                  buttonText={{ today: "Hoy" }}
                  locale="es"
                  eventClick={({ event }) => {
                    history.push(`/events/${event.id}`);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {showCalendar && (
          <ReservationCalendar
            reservation={reservation}
            events={events}
            hide={() => setShowCalendar(false)}
            confirmAction={(start, end) => {
              if (shownLocation)
                setReservation({ location: shownLocation, start, end });
            }}
          />
        )}
      </div>
    </div>
  );
};
export default LocationPicker;
