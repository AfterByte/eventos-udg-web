import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import DeleteMessage from "../Components/DeleteMessage";
//google maps
import Maps, { IMarker } from "../Components/Maps";
//icons
import Help from "../assets/icons/help.svg";
import Search from "../assets/icons/search-black.svg";
import Clear from "../assets/icons/clear-black.svg";
// Providers imports
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
// Payloads impors
import { Location } from "../helpers/payloads";
import { typeOf } from "../helpers/validationFunctions";

export default function LocationDetails() {
  // Context
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  // States
  const [location, setLocation] = useState<Location>();
  const [marker, setMarker] = useState<IMarker>();
  const [showMessage, setShowMessage] = useState(false);
  const [enablePermitedLocations, setEnablePermitedLocations] = useState(false);
  // Effect
  useEffect(() => {
    const findLocation = async () => {
      const location = (await apiClient.getLocation(id)).body;
      if (typeOf<Location>("id", location)) setLocation(location);
      else console.log(location);
    };
    if (!location) findLocation();
    if (location && !marker)
      setMarker({
        lat: location.latitude,
        lng: location.longitude,
        name: "marker",
      });
  });

  //for google map
  const mapConfig = {
    center: {
      lat: location?.latitude,
      lng: location?.longitude,
    },
    zoom: 17,
  };

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
                <Header barTitle={"Detalles de ubicaciones"} />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-0 bg-indigo-500 bg-opacity-50">
            <div className="grid grid-cols-6 mt-4 xl:mt-4 sm:mt-6 mb-4 sm:mb-8 h-auto">
              {/* Firts section - LOCATION DETAILS */}
              <div className={enablePermitedLocations
                              ? "col-span-6 xl:col-span-4 grid grid-cols-6 gap-4 bg-white ml-2 xl:ml-4 mr-2 rounded-md shadow-sm"
                              : "col-span-6 xl:col-span-6 grid grid-cols-6 gap-4 bg-white ml-2 xl:ml-4 mr-4 rounded-md shadow-sm"}>
                <div className="col-span-5 mt-2 ml-2">
                  <div className="grid grid-cols-1">
                    <label htmlFor="name" className="pb-2">
                      Nombre
                    </label>
                    <div className="border border-gray-500 rounded-sm py-2 px-2 mr-2">
                      <p>{location?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 mt-2">
                  <div className="grid grid-cols-1">
                    <label
                      htmlFor="capacity"
                      className="text-xs pb-3 xl:text-base xl:pb-2"
                    >
                      Capacidad máxima
                    </label>
                    <div className="border border-gray-500 rounded-sm py-2 px-2 mr-2">
                      <p>{location?.max_capacity}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 ml-2">
                  <div className="grid grid-cols-1">
                    <label htmlFor="location" className="pb-2">
                      Ubicación
                    </label>
                    <div className="border border-gray-500 rounded-sm py-2 px-2 mr-2">
                      <p>{location?.address}</p>
                    </div>
                  </div>
                </div>
                {/* Google map */}
                <div className="col-span-6 ml-2 mr-2 h-64">
                  <Maps marker={marker} />
                </div>

                <div className="col-span-6 ml-2">
                  {!location?.third_party ? (
                    <p className="text-lg">
                      Esta ubicación si es administrada por UDG
                    </p>
                  ) : (
                    <p className="text-lg">
                      Esta ubicación no es administrada por UDG
                    </p>
                  )}
                  <div className="grid grid-cols-12 my-4">
                    <div className="col-span-1 flex justify-center pt-2">
                      <img className="h-5" src={Help} alt="help-icon" />
                    </div>
                    <p className="col-span-8 text-sm">
                      Ubicaciones no pertenecientes a UDG pueden agregarse en la
                      agenda de Eventos de UDG pero se debe consultar primero al
                      encargado del lugar.
                    </p>
                  </div>
                </div>

                <div className="col-span-6 ml-2">
                  {!location?.disabled ? (
                    <p className="text-lg">
                      La ubicación se encuentra habilitada
                    </p>
                  ) : (
                    <p className="text-lg">
                      La ubicación se encuentra deshabilitada temporalmente
                    </p>
                  )}
                  <div className="grid grid-cols-12 my-4">
                    <div className="col-span-1 flex justify-center">
                      <img className="h-5" src={Help} alt="help-icon" />
                    </div>
                    <p className="col-span-8 text-sm">
                      Cuando la ubicación se encuentra deshabilitada, está no
                      puede utilizarse en ningún evento nuevo.
                    </p>
                  </div>
                </div>

                {/* buttons */}
                <div className="col-span-6 ml-2 mt-20 mb-8 grid grid-cols-12 gap-4">
                  <div className="col-span-12 xl:col-span-3 text-center">
                    <Link to="/locations">
                      <button className="bg-gray-500 text-white font-medium py-1 px-12 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                        Volver
                      </button>
                    </Link>
                  </div>
                  <div className="col-span-12 xl:col-span-6 text-center">
                    <Link to={`/locations/${location?.id}/edit`}>
                      <button className="bg-blue-500 text-white text-xl font-medium py-1 px-12 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                        Editar
                      </button>
                    </Link>
                  </div>
                  <div className="col-span-12 xl:col-span-3 text-center">
                    <button
                      onClick={() => setShowMessage(!showMessage)}
                      className="bg-red-500 text-white font-medium py-1 px-12 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              {/* Second section - CAMPUS PERMITED LOCATIONS */}
              {enablePermitedLocations ?
                <div className="col-span-6 xl:col-span-2 bg-white ml-2 mr-2 xl:mr-4 rounded-md shadow-sm mt-4 xl:mt-0 pb-4 xl:pb-0">
                  <div className="col-span-2 grid grid-cols-6 mt-4 ml-2 mr-2">
                    <div className="col-span-6 border-b-4">
                      <p className="text-lg">
                        Organizadores que pueden hacer uso de esta ubicación
                      </p>
                      <div className="grid grid-cols-12 my-4">
                        <div className="col-span-1 flex justify-center pt-2">
                          <img className="h-5" src={Help} alt="help-icon" />
                        </div>
                        <p className="col-span-10 text-sm">
                          Solo los organizadores de las universidades aquí
                          indicadas podrán hacer uso de esta ubicación al crear un
                          evento.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-6 mt-4 ml-2 mr-2">
                    <div className="col-start-3 col-end-7 flex ml-2 sm:ml-0 justify-center sm:justify-end">
                      <form
                        className="flex w-full"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <label className="flex w-full h-full mr-2 sm:mr-0 border border-gray-500 border-opacity-50">
                          <img
                            className="h-full sm:py-0 py-1 px-1 bg-gray-500 bg-opacity-50"
                            style={{ opacity: "0.5" }}
                            src={Search}
                            alt={"SearchIcon"}
                          />
                          <input
                            className="sm:mr-0 px-1 bg-gray-500 bg-opacity-25 w-full"
                            type="text"
                            name="buscar"
                          />
                        </label>
                        <div className="hidden sm:grid mr-2 px-2 py-2 text-md font-normal text-white bg-blue-500 items-center">
                          Buscar
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* organizers list */}
                  <div className="col-span-2 grid grid-cols-6 gap-4 mt-6 ml-2 mr-2">
                    {location?.campuses?.map((campus) => (
                      <div className="col-span-3 py-2 flex justify-between items-center border border-gray-500">
                        <p className="text-center pl-2">{campus.name}</p>
                        <button>
                          <img className="h-6" src={Clear} alt={"ClearTagIcon"} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                : <div className="hidden"></div>
              }
              
            </div>

            {showMessage ? (
              <DeleteMessage
                thing="Ubicación"
                deleteAction={() => {}}
                hide={() => setShowMessage(false)}
              />
            ) : (
              <div className="hidden"></div>
            )}
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
