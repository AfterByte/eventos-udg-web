import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Custom Components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Guest from "../../components/Guest";
import { ConfirmDialogue } from "../../components/elements";
// Helpers and payloads
import { Event, Ticket } from "../../helpers/payloads";
import {
  formatDate,
  parseFullName,
  typeOf,
} from "../../helpers/validationFunctions";
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
import {
  createTicket,
  deleteTicket,
  getEvent,
  getImage,
  ownedTickets,
} from "../../helpers/apiClient";
// Assets
import iGetT from "../../assets/icons/confirmIcon.svg";
import iDelT from "../../assets/images/Throw_away.svg";

export default function ShowEvent() {
  // Context
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  // States
  const [event, setEvent] = useState<Event>();
  const [image, setImage] = useState("");
  const [ticket, setTicket] = useState<Ticket>();
  const [showEnroll, setShowEnroll] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const fetchImage = async (event: Event) => {
    if (event.image) {
      const response = await getImage(apiClient, event.image);
      if (response.status === 200 && response.body) setImage(response.body.url);
      else setImage("");
    }
  };

  const isEnrolled = async (event: Event) => {
    const response = await ownedTickets(apiClient);
    if (response.status < 300) {
      if (
        response.status !== 204 &&
        typeOf<{ tickets: Ticket[] }>("tickets", response.body)
      ) {
        const { tickets } = response.body;
        const t = tickets.find((ticket) => ticket.event.id === event.id);
        if (t) setTicket(t);
      }
    } else console.log(response);
  };

  const findEvent = async () => {
    const response = await getEvent(apiClient, id);
    if (response.status < 300) {
      if (typeOf<Event>("id", response.body)) {
        await fetchImage(response.body);
        await isEnrolled(response.body);
        setEvent(response.body);
      }
    } else console.log(response);
  };

  const enroll = async () => {
    if (event) {
      const response = await createTicket(apiClient, event.id);
      if (response.status < 300 && typeOf<Ticket>("id", response.body))
        setTicket(response.body);
      else console.log(response);
    }
  };

  const disenroll = async () => {
    if (event && ticket) {
      const response = await deleteTicket(apiClient, ticket.id);
      if (response.status < 300) setTicket(undefined);
      else console.log(response);
    }
  };

  useEffect(() => {
    if (!event) findEvent();
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Detalles de evento" />
        <div className="flex-grow overflow-auto flex flex-col">
          <div className="m-4 p-4 flex-grow grid sm:grid-cols-2 grid-cols-1 h-auto bg-white rounded-md shadow-md">
            <div
              className="col-span-1 md:mr-8 bg-cover py-24 md:py-64 rounded-t-md md:rounded-t-none md:rounded-l-md"
              style={{
                backgroundImage: `url('${image}')`,
              }}
            />
            <div className="col-span-1 mx-2 md:mx-0 md:mt-5 md:mr-10 my-1 flex justify-between">
              <div className="grid grid-cols-1 w-full">
                <div className="col-span-1 flex flex-col">
                  <p className="text-lg sm:text-xl md:text-2xl">
                    {event?.name}
                  </p>
                  <p className="text-md md:text-lg">
                    <span className="text-red-500 mr-4">
                      {formatDate(
                        new Date(event?.reservation.start || new Date())
                      ) + " "}
                    </span>
                    Ubicación: {event?.reservation.location.name}
                  </p>
                  <p className="text-md md:text-lg">
                    Domiciolio:{" "}
                    {`${event?.reservation.location.address} ${event?.reservation.location.city}`}
                  </p>
                </div>
                <p className="col-span-1 md:text-lg mt-10">
                  {event?.description}
                </p>
                <p className="col-span-1 text-md md:text-lg mt-10">
                  <span className="font-semibold">Organizado por:</span>{" "}
                  {parseFullName(event?.organizer)}
                </p>
                {/* Guest profile */}
                <p className="col-span-1 text-md md:text-lg mt-10">
                  Invitados:
                </p>

                <div className="col-span-1 flex flex-col md:flex-row justify-center mt-5">
                  {event?.guests.map((guest) => (
                    <Guest guest={guest} />
                  ))}
                </div>
                {/* Get ticket Button */}
                <div className="flex flex-col items-center">
                  {ticket ? (
                    <button
                      onClick={() => setShowCancel(true)}
                      className="font-small mt-10 py-3 w-40 xl:font-medium text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                    >
                      Cancelar entrada
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowEnroll(true)}
                      className="font-small mt-10 py-3 w-40 xl:font-medium text-white bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                    >
                      Adquirir entrada
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEnroll && (
          <ConfirmDialogue
            confirmAction={enroll}
            hide={() => {
              setShowEnroll(false);
            }}
            dialogue={`Está por inscribirse a este evento\n¿Desea proceder?`}
            image={iGetT}
            buttonColor="#63acaa"
          />
        )}

        {showCancel && (
          <ConfirmDialogue
            confirmAction={disenroll}
            hide={() => {
              setShowCancel(false);
            }}
            dialogue={`Está por revocar su entrada a este evento\n¿Desea proceder?`}
            image={iDelT}
            buttonColor="#bd4455"
          />
        )}
      </div>
    </div>
  );
}
