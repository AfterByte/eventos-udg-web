import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// Context imports
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
// Payload import
import { Location, Without } from "../helpers/payloads";
//import external components
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import LocationCard from "../Components/LocationCard";
import DeleteMessage from "../Components/DeleteMessage";
/**ALERTS WITH SWEETALERT */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//import imgs/svgs
import addIcon from "../assets/icons/add.svg";
import { typeOf } from "../helpers/validationFunctions";
// API Client
import { deleteLocation, indexLocations } from "../helpers/apiClient";

export default function LocationMenu() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [showMessage, setShowMessage] = useState(false);
  const [locations, setLocations] = useState<Without<Location, "campuses">[]>(
    []
  );
  const [shownLocation, setShownLocation] = useState<
    Without<Location, "campuses">
  >();

  const firstUpdate = useRef(true);

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

  const removeLocation = async () => {
    if (shownLocation) {
      const response = await deleteLocation(apiClient, shownLocation.id);
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
                <Header barTitle={"Ubicaciones"} />
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
                <button className="fixed z-10 bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                  <Link to="/locations/new">
                    <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
                  </Link>
                </button>

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
                  <div className="xl:mt-10 px-6 xl:px-12 xl:mx-12 xl:w-1/4 overflow-hidden bg-white shadow-xl xl:shadow-md xl:fixed">
                    {shownLocation && (
                      <div className="text-center pt-1 pb-1 xl:pt-16 xl:pb-12">
                        <p className="text-sm xl:text-xl font-bold">
                          {shownLocation.name}
                        </p>
                        <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                          {shownLocation.city}
                        </p>
                        <p className="text-sm xl:text-base text-red-500 pt-2">
                          {shownLocation.address}
                        </p>
                        <p className="text-sm xl:text-base pt-2">
                          Capacidad: {shownLocation.max_capacity} personas
                        </p>
                        {!shownLocation.third_party ? (
                          <p className="hidden xl:grid text-sm xl:text-base pt-6">
                            Esta ubicación es administrada por Eventos UDG
                          </p>
                        ) : (
                          <p className="hidden xl:grid text-sm xl:text-base pt-6">
                            Esta ubicación no es administrada por Eventos UDG
                          </p>
                        )}
                        <div className="flex justify-between pt-2 xl:pt-0 xl:grid xl:justify-center">
                          <div>
                            <Link to={`/locations/${shownLocation.id}`}>
                              <button className="font-small px-1 py-1 xl:font-medium text-white xl:mt-12 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                                Ver ubicación
                              </button>
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setShowMessage(true);
                              }}
                              className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                            >
                              Eliminar ubicación
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showMessage ? (
                <DeleteMessage
                  thing="Ubicación"
                  deleteAction={removeLocation}
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
}
