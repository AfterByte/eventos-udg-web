import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// Context imports
import { AuthContext, AuthProviderPayload } from "../components/AuthProvider";
// Payload import
import { Event, Ticket } from "../helpers/payloads";
//import external components
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TaskBar from "../components/TaskBar";
import TicketCard from "../components/cards/TicketCard";
import { ConfirmDialogue } from "../components/elements";
// Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Assets
import deleteImage from "../assets/images/Throw_away.svg";
// API Client & helpers
import { deleteTicket, ownedTickets } from "../helpers/apiClient";
import { formatDate, typeOf } from "../helpers/validationFunctions";

export default function Tickets() {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [shownTicket, setShownTicket] = useState<Ticket>();
  const [shownImage, setShownImage] = useState("");
  const [shownQr, setShownQr] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const firstUpdate = useRef(true);
  const history = useHistory();

  const knownStatuses = [
    { name: "scheduled", translation: "Agendado", color: "text-green-700" },
    { name: "pending", translation: "Pendiente", color: "text-yellow-600" },
    { name: "postponed", translation: "Pospuesto", color: "text-indigo-500" },
    { name: "cancelled", translation: "Cancelado", color: "text-red-500" },
    { name: "ended", translation: "Terminado", color: "" },
  ];

  // Sweet alert
  const MySwal = withReactContent(Swal);
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", MySwal.stopTimer);
      toast.addEventListener("mouseleave", MySwal.resumeTimer);
    },
  });

  const getTickets = async () => {
    const response = await ownedTickets(apiClient);
    if (response.status === 204) setTickets([]);
    else if (
      response.body &&
      typeOf<{ tickets: Ticket[] }>("tickets", response.body)
    )
      setTickets(response.body.tickets);
  };

  const removeTicket = async () => {
    if (shownTicket) {
      const response = await deleteTicket(apiClient, shownTicket.id);
      if (response.status === 204) {
        /*  MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "Se ha eliminado la ubicación",
          showConfirmButton: false,
          timer: 1500,
        }); */

        Toast.fire({
          icon: "success",
          title: "Ubicacion eliminada con exito",
        });

        setShownTicket(undefined);
        getTickets();
      } else console.log(response);
    }
  };

  const setTicket = (ticket: Ticket, image: string, qrUrl: string) => {
    setShownTicket(ticket);
    setShownImage(image);
    setShownQr(qrUrl);
  };

  const setStatus = (event: Event) => {
    const status = knownStatuses.find(
      (status) => status.name === event.status.name
    );

    return (
      <p className="text-sm xl:text-lg my-auto">
        Estatus del evento:
        <span className={status?.color}>{" " + status?.translation}</span>
      </p>
    );
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getTickets();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Mis entradas" />
        <TaskBar />
        <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
            {tickets.map((ticket) => (
              <TicketCard ticket={ticket} setShownTicket={setTicket} />
            ))}
          </div>

          <div className="xl:static xl:col-span-5">
            {/* Event preview */}
            {shownTicket && (
              <div className="xl:m-8">
                {shownImage ? (
                  <img
                    className="hidden border-2 border-gray rounded-md xl:block object-cover w-48 h-48 mx-auto shadow-md"
                    src={shownImage}
                    alt="Event"
                  />
                ) : null}
                <div
                  className={`p-4 text-center bg-white xl:p-8 ${
                    shownImage ? "xl:-mt-24 xl:pt-32" : ""
                  }`}
                >
                  <div className="flex xl:block justify-center">
                    <p className="text-lg md:text-xl font-bold md:mb-2 mr-2 xl:mr-0">
                      {shownTicket.event.name}
                    </p>
                    {setStatus(shownTicket.event)}
                  </div>
                  <div className="flex xl:block justify-center">
                    <p className="font-light text-md text-red-600 sm:text-xl mr-2 xl:mr-0">
                      {formatDate(
                        new Date(shownTicket.event.reservation.start)
                      )}
                    </p>
                    <p className="font-light text-md sm:text-xl">
                      {"Ubicación: " +
                        shownTicket.event.reservation.location.name}
                    </p>
                    <img
                      src={shownQr}
                      alt="ticket qr code"
                      className="hidden xl:block w-32 mx-auto"
                    />
                  </div>
                  <div className="flex xl:flex-col xl:mt-4">
                    <button
                      onClick={() => {
                        history.push(`/events/${shownTicket.event.id}`);
                      }}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Ver evento
                    </button>
                    <a
                      href={shownQr}
                      download={`boletoqr_${shownTicket.event.name}`}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Descargar boleto QR
                    </a>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                      }}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Cancelar entrada
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showDelete && (
          <ConfirmDialogue
            confirmAction={removeTicket}
            hide={() => {
              setShowDelete(false);
            }}
            dialogue="¿Está seguro de querer cancelar su boleto de entrada al evento?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
      </div>
    </div>
  );
}
