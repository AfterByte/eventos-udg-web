import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import ShowQR from "../Components/ShowQR";
import MyEventCard from "../Components/MyEventCard";
import { Link } from "react-router-dom";
import { eventsTickets } from "../helpers/mockData";

//import imgs/svgs
import addIcon from "../assets/icons/add.svg";
import ticketGirl from "../Images/ticketGirl.jpeg";
/**IMPORT QR CODE GENERATE */
import QRCode from "qrcode";
/** */
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { Event } from "../helpers/payloads";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
import { typeOf } from "../helpers/validationFunctions";
import { getImage, indexCampuses } from "../helpers/apiClient";

export default function MyEventsView() {
  /**CONST FOR  CONNECTION AND DATA */
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  /**CONSTANT TO MAKE THE TEST IN ALLEVENTS */
  /*const [event, setEvent] = useState<Event[]>([]); */

  const [event, setEvent] = useState(eventsTickets);
  const [shownEvent, setShownEvent] = useState<Event>();
  const [shownImage, setShownImage] = useState("");
  const [showQR, setShowQR] = useState(false);

  const firstUpdate = useRef(true);

  const getEvent = async () => {
    const response = await indexCampuses(apiClient);
    if (response.status === 204) setEvent([]);
    else if (
      response.body &&
      typeOf<{ Events: Event[] }>("Eventos", response.body)
    )
      setEvent(response.body.Events);
  };

  const fetchImage = async (id: string) => {
    const response = await getImage(apiClient, id);
    if (response.status === 200 && response.body)
      setShownImage(response.body.url);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getEvent();
    }
  });

  /**GET INFO TEST TO EVENTS*/
  const ticketCards: any = [];
  for (const eventos of event) {
    ticketCards.push(
      <MyEventCard ticket={eventos} setShownTicket={setShownEvent} />
    );
  }

  /**QR GENERATE CODE */
  const [url, setUrl] = useState("");
  async function generateQR() {
    const url = await QRCode.toDataURL(shownEvent?.id || "");
    setUrl(url);
  }
  useMemo(() => {
    if (shownEvent) generateQR();
  }, [shownEvent]);

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
                <Header barTitle={"Mis eventos"} />
                <Taskbar />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-64 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <div className="grid grid-cols-12 mt-6 sm:mt-24 mb-4 sm:mb-8">
              <div className="col-span-12 sm:col-start-1 sm:col-end-8 gap-4 grid sm:grid-cols-1 grid-cols-1 xl:mt-8 pb-1">
                <button
                  className="fixed z-10 bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                  id="createCampus"
                >
                  <Link to="/createEvent">
                    <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
                  </Link>
                </button>

                {event.map((eventObject) => (
                  <MyEventCard
                    setShownTicket={setShownEvent}
                    ticket={eventObject}
                  />
                ))}
              </div>

              <div className="col-span-12 xl:col-start-8 xl:col-end-13 grid grid-cols-12 fixed xl:static w-full -mt-40 xl:mt-0 xl:ml-0">
                {/*div for the separator line*/}
                <div className="hidden ml-8 border-r border-white xl:grid fixed h-full overflow-hidden"></div>
                {/* location description card */}
                <div className="col-span-12 xl:col-start-2 xl:col-end-13 xl:pt-8">
                  <div className="xl:mt-10 px-6 xl:px-12 xl:mx-12 xl:w-1/4 bg-white shadow-xl xl:shadow-md xl:fixed">
                    {shownEvent && (
                      <div className="xl:mt-8">
                        <div className="hidden xl:grid grid-cols-1">
                          <div className="col-span-1 px-5">
                            <img
                              className="w-full h-56 -mt-16 shadow-md"
                              src={ticketGirl}
                              alt="campus image"
                            />
                          </div>
                        </div>

                        <div className="text-center pt-1 pb-1 xl:pt-8 xl:pb-12">
                          <p className="text-sm xl:text-xl font-bold">
                            {shownEvent.name}
                          </p>
                          <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                            {/*  {shownTicket.reservation.start.toDateString} */}
                            18/Julio/2020 07:35 pm
                          </p>
                          <p className="text-sm xl:text-base text-red-500 pt-2">
                            {shownEvent.reservation.location.name}
                          </p>
                          <p className="text-sm xl:text-base pt-2">
                            <img
                              className="w-2/6 ml-32 shadow-md"
                              src={url}
                              alt=""
                            />
                          </p>
                          <div className="flex justify-between pt-2 xl:pt-0 xl:grid xl:justify-center">
                            <div className="ml-2">
                              <button
                                onClick={() => {
                                  setShowQR(true);
                                }}
                                className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                              >
                                Descargar QR
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showQR ? (
                      <ShowQR
                        thing="Elije"
                        hide={() => {
                          setShowQR(false);
                        }}
                        Events={shownEvent?.id}
                      />
                    ) : (
                      <div className="hidden"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
