import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
// Context imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
// Payload import
import { Event } from "../../helpers/payloads";
//import external components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import TaskBar from "../../components/TaskBar";
import EventCard from "../../components/cards/EventCard";
import { ConfirmDialogue } from "../../components/elements";
// Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Assets
import addIcon from "../../assets/icons/add.svg";
import deleteImage from "../../assets/images/Throw_away.svg";
// API Client & helpers
import {
  deleteEvent,
  getEvent,
  indexEvents,
  ownedEvents,
  updateEventStatus,
} from "../../helpers/apiClient";
import { formatDate, typeOf } from "../../helpers/validationFunctions";
import ShareEvent from "../../components/elements/ShareEvent";

type IndexEventsProps = {
  fetchOwned?: boolean;
};

export default function IndexEvents({ fetchOwned = false }: IndexEventsProps) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [shownEvent, setShownEvent] = useState<Event>();
  const [shownImage, setShownImage] = useState("");
  const [showShare, setShowShare] = useState(false);

  const firstUpdate = useRef(true);
  const history = useHistory();

  const knownStatuses = [
    { name: "scheduled", translation: "Agendado", color: "text-green-700" },
    { name: "pending", translation: "Pendiente", color: "text-yellow-600" },
    { name: "postponed", translation: "Pospuesto", color: "text-indigo-500" },
    { name: "cancelled", translation: "Cancelado", color: "text-red-500" },
    { name: "ended", translation: "Terminado", color: "" },
  ];

  /**CONST FOR USE SWEETALERT */
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

  const getEvents = async () => {
    const response = fetchOwned
      ? await ownedEvents(apiClient)
      : await indexEvents(apiClient);
    if (response.status === 204) setEvents([]);
    else if (
      response.body &&
      typeOf<{ events: Event[] }>("events", response.body)
    )
      setEvents(response.body.events);
  };

  const removeEvent = async () => {
    if (shownEvent) {
      const response = await deleteEvent(apiClient, shownEvent.id);
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

        setShownEvent(undefined);
        getEvents();
      } else console.log(response);
    }
  };

  const cancelEvent = async () => {
    if (shownEvent) {
      const response = await updateEventStatus(
        apiClient,
        shownEvent.id,
        "cancelled"
      );
      if (response.status === 204) {
        const rEvent = await getEvent(apiClient, shownEvent.id);
        if (rEvent.status === 200 && typeOf<Event>("id", rEvent.body)) {
          setShownEvent(rEvent.body);
          getEvents();
        }
      }
    }
  };

  const setEvent = (event: Event, image: string) => {
    setShownEvent(event);
    setShownImage(image);
  };

  const setStatus = (event: Event) => {
    const status = knownStatuses.find(
      (status) => status.name === event.status.name
    );

    return (
      <p className={`text-sm xl:text-lg my-auto ${status?.color}`}>
        {status?.translation}
      </p>
    );
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
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle={fetchOwned ? "Mis eventos" : "Todos los eventos"} />
        <TaskBar />
        <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
            {events.map((event) => (
              <EventCard event={event} setShownEvent={setEvent} />
            ))}
            <button className="fixed bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <Link to="/events/new">
                <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
              </Link>
            </button>
          </div>

          <div className="xl:static xl:col-span-5">
            {/* Event preview */}
            {shownEvent && (
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
                      {shownEvent.name}
                    </p>
                    {setStatus(shownEvent)}
                  </div>
                  <div className="flex xl:block justify-center">
                    <p className="font-light text-md text-red-600 sm:text-xl mr-2 xl:mr-0">
                      {formatDate(new Date(shownEvent.reservation.start))}
                    </p>
                    <p className="font-light text-md sm:text-xl">
                      {shownEvent.reservation.location.name}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="inline mx-auto">
                      <button
                        onClick={() => {
                          history.push(`/events/${shownEvent.id}/edit`);
                        }}
                        className="xl:text-lg mr-4 p-2 px-3 text-white bg-indigo-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                      >
                        Posponer evento
                      </button>
                      <button
                        onClick={() => {
                          setShowCancel(true);
                        }}
                        className="xl:text-lg p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                      >
                        Cancelar evento
                      </button>
                    </div>
                  </div>
                  <div className="flex xl:flex-col xl:mt-16">
                    <button
                      onClick={() => {
                        history.push(`/events/${shownEvent.id}`);
                      }}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Ver evento
                    </button>
                    <button
                      onClick={() => setShowShare(true)}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Compartir evento
                    </button>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                      }}
                      className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Eliminar evento
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showDelete && (
          <ConfirmDialogue
            confirmAction={removeEvent}
            hide={() => {
              setShowDelete(false);
            }}
            dialogue="¿Está seguro de querer eliminar el evento?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
        {showCancel && (
          <ConfirmDialogue
            confirmAction={cancelEvent}
            hide={() => {
              setShowCancel(false);
            }}
            dialogue="¿Está seguro de querer cancelar el evento?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
        {showShare && (
          <ShareEvent
            hide={() => {
              setShowShare(false);
            }}
            event={shownEvent}
          />
        )}
      </div>
    </div>
  );
}
