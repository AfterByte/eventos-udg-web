import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
// Context imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
// Payload import
import { Location, Without } from "../../helpers/payloads";
//import external components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import TaskBar from "../../components/TaskBar";
import LocationCard from "../../components/cards/LocationCard";
import { ConfirmDialogue } from "../../components/elements";
// Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Assets
import addIcon from "../../assets/icons/add.svg";
import deleteImage from "../../assets/images/Throw_away.svg";
// API Client & helpers
import { deleteLocation, indexLocations } from "../../helpers/apiClient";
import { typeOf } from "../../helpers/validationFunctions";

export default function IndexLocations() {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [showMessage, setShowMessage] = useState(false);
  const [locations, setLocations] = useState<Without<Location, "campuses">[]>(
    []
  );
  const [shownLocation, setShownLocation] = useState<
    Without<Location, "campuses">
  >();

  const history = useHistory();
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
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Ubicaciones" />
        <TaskBar />
        <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
            {locations.map((location) => (
              <LocationCard
                location={location}
                setShownLocation={setShownLocation}
              />
            ))}
            <button className="fixed bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <Link to="/locations/new">
                <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
              </Link>
            </button>
          </div>

          <div className="xl:static xl:col-span-5">
            {/* Location preview */}
            {shownLocation && (
              <div className="p-4 bg-white text-center xl:m-8 xl:p-8 xl:pt-16">
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
                <div className="flex xl:flex-col xl:mt-16 justify-center">
                  <button
                    onClick={() => {
                      history.push(`/locations/${shownLocation.id}`);
                    }}
                    className="xl:mx-auto xl:text-lg mr-4 mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                  >
                    Ver ubicación
                  </button>
                  <button
                    onClick={() => {
                      setShowMessage(true);
                    }}
                    className="xl:mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                  >
                    Eliminar ubicación
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showMessage && (
          <ConfirmDialogue
            confirmAction={removeLocation}
            hide={() => {
              setShowMessage(false);
            }}
            dialogue="¿Está seguro de querer eliminar la ubicación?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
      </div>
    </div>
  );
}
