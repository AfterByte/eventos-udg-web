import React, { useState, useContext, useEffect, useRef } from "react";
// Context imports
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
// Payload import
import { Location, Without } from "../helpers/payloads";
//import external components
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import LocationCard from "../Components/LocationCard";
import DeleteMessage from "../Components/DeleteMessage";
import ShowCalendar from "../Components/ShowCalendar";
//import imgs/svgs
import { typeOf } from "../helpers/validationFunctions";
import ProgresiveBar from "../Components/ProgresiveBar";

//Import calendar
import Calendar from "../Components/Calendar";
import { deleteLocation, indexLocations } from "../helpers/apiClient";

export default function LocationMenu() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [showCalendar, setShowCalendar] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [locations, setLocations] = useState<Without<Location, "campuses">[]>(
    []
  );
  const [shownLocation, setShownLocation] = useState<
    Without<Location, "campuses">
  >();

  const firstUpdate = useRef(true);

  const getLocations = async () => {
    const response = await indexLocations(apiClient);
    if (
      response.body &&
      typeOf<{ locations: Without<Location, "campuses">[] }>(
        "locations",
        response.body
      )
    )
      setLocations(response.body.locations);
  };

  const removeLocation = async () => {
    if (shownLocation) {
      const response = await deleteLocation(apiClient, shownLocation.id);
      if (response.status === 204) {
        setShownLocation(undefined);
        getLocations();
      } else console.log(response);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getLocations();
      firstUpdate.current = false;
    }
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
                <Header barTitle={"Crear Eventos"} />
                <ProgresiveBar progressTitle={"Elige ubicación"} />
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
                {locations.map((location) => (
                  <LocationCard
                    location={location}
                    setShownLocation={setShownLocation}
                  />
                ))}
              </div>

              <div className="col-span-12 xl:col-start-8 xl:col-end-13 grid grid-cols-12 fixed xl:static w-full -mt-40 xl:mt-0 xl:ml-0">
                {/*div for the separator line*/}
                <div className="hidden ml-8 border-r border-white xl:grid fixed h-full overflow-hidden"></div>
                {/* location description card */}
                <div className="col-span-12 xl:col-start-2 xl:col-end-13">
                  <div className="xl:mt-4 px-6 xl:px-0 xl:mx-12 xl:w-1/4 overflow-hidden bg-white shadow-xl xl:shadow-md xl:fixed">
                    {shownLocation && (
                      <div className="text-center pt-1 pb-1 xl:pt-4 xl:pb-4">
                        <p className="text-sm xl:text-xl font-bold">
                          {shownLocation.name}
                        </p>
                        <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                          {shownLocation.city}
                        </p>
                        <p className="text-sm xl:text-base text-red-500 pt-2">
                          {shownLocation.address}
                        </p>

                        <div className="flex justify-between pt-2 xl:pt-0 xl:grid xl:justify-center">
                          <div>
                            <button
                              onClick={() => {
                                setShowCalendar(true);
                              }}
                              className="font-small px-1 py-1 xl:font-medium text-white xl:mt-12 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                            >
                              Hacer reservación
                            </button>
                          </div>
                        </div>
                        <div className="xl:mt-8 px-6 xl:px-10 xl:mx-0 xl:w-1/4 overflow-hidden bg-white shadow-xl xl:shadow-md xl:fixed">
                          <Calendar />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showCalendar ? (
                <ShowCalendar
                  thing="Elije"
                  deleteAction={removeLocation}
                  hide={() => {
                    setShowCalendar(false);
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
}
