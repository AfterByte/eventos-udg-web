import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// Context imports
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
// Payload import
import { Location, Without, Event } from "../helpers/payloads";
import { eventsTickets } from "../helpers/mockData";

//import external components
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import TicketCard from "../Components/TicketCard";
import DeleteMessage from "../Components/DeleteMessage";

//import imgs/svgs
import addIcon from "../assets/icons/add.svg";
import { typeOf } from "../helpers/validationFunctions";
import ticketGirl from "../Images/ticketGirl.jpeg";
/**IMPORT QR CODE GENERATE */
import QRCode from "qrcode";

const ViewTickets = () => {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [showMessage, setShowMessage] = useState(false);
  const [tickets, setTickets] = useState(eventsTickets);
  const [shownTicket, setShownTicket] = useState<Event>();

  const firstUpdate = useRef(true);

  const getLocations = async () => {
    /* const response = await apiClient.indexLocations();
    if (
      response.body &&
      typeOf<{ locations: Without<Location, "campuses">[] }>(
        "locations",
        response.body
      )
    )
      setLocations(response.body.locations); */
  };

  const deleteLocation = async () => {
    /*  if (shownLocation) {
      const response = await apiClient.deleteLocation(shownLocation.id);
      if (response.status === 204) {
        setShownLocation(undefined);
        getLocations();
      } else console.log(response);
    } */
  };

  useEffect(() => {
    /* if (firstUpdate.current) {
      getLocations();
      firstUpdate.current = false;
    } */
  });

  /**GET INFO */
  const ticketCards: any = [];
  for (const event of tickets) {
    ticketCards.push(
      <TicketCard ticket={event} setShownTicket={setShownTicket} />
    );
  }
  /**TODO: CHANGE  */
  /** */

  /**QR GENERATE CODE */
  const [url, setUrl] = useState("");
  async function generateQR() {
    const url = await QRCode.toDataURL(shownTicket?.id || "");
    setUrl(url);
  }

  useEffect(() => {
    if (!url) generateQR();
  });
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
                <Header barTitle={"Mis entradas"} />
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
              <div className="col-span-12 sm:col-start-1 sm:col-end-8 gap-4 grid sm:grid-cols-1 grid-cols-1 mt-8 pb-1">
                {ticketCards}
              </div>

              <div className="col-span-12 xl:col-start-8 xl:col-end-13 grid grid-cols-12 fixed xl:static w-full -mt-40 xl:mt-0 xl:ml-0">
                {/*div for the separator line*/}
                <div className="hidden ml-8 border-r border-white xl:grid fixed h-full overflow-hidden"></div>
                {/* location description card */}
                <div className="col-span-12 xl:col-start-2 xl:col-end-13 xl:pt-8">
                  <div className="xl:mt-10 px-6 xl:px-12 xl:mx-12 xl:w-1/4 bg-white shadow-xl xl:shadow-md xl:fixed">
                    {shownTicket && (
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
                            {shownTicket.name}
                          </p>
                          <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                            {/*  {shownTicket.reservation.start.toDateString} */}
                            18/Julio/2020 07:35 pm
                          </p>
                          <p className="text-sm xl:text-base text-red-500 pt-2">
                            {shownTicket.reservation.location.name}
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
                              <button className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                                Descargar QR
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showMessage ? (
                <DeleteMessage
                  thing="Boleto"
                  deleteAction={deleteLocation}
                  hide={() => {
                    setShowMessage(false);
                  }}
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
};
export default ViewTickets;
