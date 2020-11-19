import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import external components
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import GetTicketConfirm from "../Components/GetTicketConfirm"
//import event data
import { Event } from "../helpers/payloads";
import { events } from "../helpers/mockData";

import { ResponsiveContext, RespContextPayload } from "../Components/Routes";

export default function EventDetailView() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  //event fake data
  const [ event, setEvent] = useState<Event>(events[parseInt(id)]);
  const [ isEnrolled, setIsEnrolled] = useState(event.enrolled);
  const [showEnrollMessage, setShowEnrollMessage] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);

  return (
    <div className="h-full">
      <div className="grid grid-cols-6 h-screen">
        <div
          className={
            !sidebarHidden
              ? "hidden sm:grid sm:col-span-1 sm:fixed sm:h-full sm:z-20 sm:w-1/6"
              : "col-span-6 sm:grid sm:col-span-1 z-20 sm:fixed h-full"
          }
        >
          <SideBar />
        </div>
        {!sidebarHidden ? (
          <div className="fixed z-10 w-full">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-start-2 sm:col-end-7">
                <Header barTitle={"Próximos Eventos"} />
                <Taskbar />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <div className="grid grid-cols-12 mt-12 sm:mt-24 mb-4 sm:mb-8">
              {/* EVENT DETAILS START */}
              <div className="col-start-2 col-end-12 gap-4 grid sm:grid-cols-2 grid-cols-1 mt-8 h-auto bg-white rounded-md shadow-md">
                <div className="col-span-1 md:mr-10 bg-cover py-24 md:py-64 rounded-t-md md:rounded-t-none md:rounded-l-md" style={{backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fourauckland.aucklandcouncil.govt.nz%2Fmedia%2F16638%2Fateed_event_lantern_17_00-221.jpg&f=1&nofb=1')`}}>
                </div>
                <div className="col-span-1 mx-2 md:mx-0 md:mt-5 md:mr-10 my-1 flex justify-between">
                  <div className="grid grid-cols-1 w-full">
                    <div className="col-span-1 flex flex-col">
                      <p className="font-semibold text-md sm:text-2xl">{event.name}</p>
                      <p className="font-base text-md"><span className="text-red-500">{event.reservation.start.toDateString()}</span> Ubicación: {event.reservation.location.name}</p>
                    </div>
                    <p className="col-span-1 font-semibold text-base md:text-xl mt-10">{event.description}</p>
                    <p className="col-span-1 font-base text-md mt-10"><span className="font-semibold">Organizado por:</span> {event.organizer.name} {event.organizer.lastname} {event.organizer.lastname}</p>
                    {/* Guest profile */}
                    <p className="col-span-1 font-base text-md mt-10">Invitados: </p>

                    <div className="col-span-1 flex flex-col md:flex-row justify-center mt-5">
                      {event.guests.map(guest => (
                        <div className="flex-col flex items-center mx-3 my-2 md:my-0">
                          <img
                            className="w-24 h-24 rounded-full shadow-md"
                            id="img"
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F219%2F219970.png&f=1&nofb=1"
                            alt="Guest avatar"
                          ></img>
                          <p className="font-base text-md">{guest.name} {guest.lastname} {guest.second_lastname}</p>
                        </div>
                      ))}
                    </div>
                    {/* Get ticket Button */}
                    {isEnrolled
                      ? <button
                          onClick={() => setShowCancelMessage(true)}
                          className="font-small mt-10 py-2 px-1 xl:font-medium text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                        >
                          Cancelar reservación
                        </button> 
                      : <button
                          onClick={() => setShowEnrollMessage(true)}
                          className="font-small mt-10 py-2 px-1 xl:font-medium text-white bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                        >
                          Adquirir entrada
                        </button>
                    }
                  </div>
                </div>
              </div>

              {/* Show confirm getTicket message */}
              {showEnrollMessage ? (
                <GetTicketConfirm
                  confirmAction={() => { setIsEnrolled(true); setShowEnrollMessage(false); }}
                  hide={() => {
                    setShowEnrollMessage(false);
                  }}
                  event={event.name}
                  isEnroll={true}
                />
              ) : (
                <div className="hidden"></div>
              )}

              {/* Show confirm getTicket message */}
              {showCancelMessage ? (
                <GetTicketConfirm
                  confirmAction={() => { setIsEnrolled(false); setShowCancelMessage(false); }}
                  hide={() => {
                    setShowCancelMessage(false);
                  }}
                  event={event.name}
                  isEnroll={false}
                />
              ) : (
                <div className="hidden"></div>
              )}

            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
