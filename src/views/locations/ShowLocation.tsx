import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
// Custom components
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { ConfirmDialogue } from "../../components/elements";
import Maps, { IMarker } from "../../components/Maps";
// Assets
import Help from "../../assets/icons/help.svg";
import deleteImage from "../../assets/images/Throw_away.svg";
// Providers imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
// Payloads imports
import { Location } from "../../helpers/payloads";
import { typeOf } from "../../helpers/validationFunctions";
// API Client
import { getLocation, deleteLocation } from "../../helpers/apiClient";

export default function ShowLocation() {
  // Context
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  // States
  const [location, setLocation] = useState<Location>();
  const [marker, setMarker] = useState<IMarker>();
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();
  // Effect
  useEffect(() => {
    const findLocation = async () => {
      const location = (await getLocation(apiClient, id)).body;
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

  const removeLocation = async () => {
    if (location) {
      const response = await deleteLocation(apiClient, location.id);
      if (response.status === 204) {
        history.push("/locations");
      } else console.log(response);
    }
  };

  //for google map
  const mapConfig = {
    center: {
      lat: location?.latitude,
      lng: location?.longitude,
    },
    zoom: 17,
  };

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Detalles de ubicación" />
        <div className="flex-grow overflow-auto flex flex-col">
          <div className="p-4 m-4 bg-white rounded-md shadow-sm flex-grow">
            <div className="flex flex-col md:flex-row">
              <div className="md:flex-grow mb-2">
                <p className="mb-2 mb-2">Nombre</p>
                <p className="border border-gray-500 rounded-sm p-2">
                  {location?.name}
                </p>
              </div>
              <div className="md:ml-4 mb-2">
                <p className="mb-2">Capacidad máxima</p>
                <p className="border border-gray-500 rounded-sm p-2">
                  {location?.max_capacity}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-2">Ubicación</p>
              <p className="border border-gray-500 rounded-sm p-2">
                {location?.address}
              </p>
            </div>

            <Maps marker={marker} />

            {location?.third_party ? (
              <div className="mt-8">
                <p className="text-lg">
                  Esta ubicación no es administrada por UDG
                </p>
                <div className="flex mt-2">
                  <img className="h-5 mr-2" src={Help} alt="help-icon" />
                  <p className="text-sm">
                    Ubicaciones no pertenecientes a UDG pueden agregarse en la
                    agenda de Eventos de UDG pero se debe consultar primero al
                    encargado del lugar.
                  </p>
                </div>
              </div>
            ) : null}

            {location?.disabled ? (
              <div className="mt-8">
                <p className="text-lg">
                  La ubicación se encuentra deshabilitada temporalmente
                </p>
                <div className="flex mt-2">
                  <img className="h-5 mr-2" src={Help} alt="help-icon" />
                  <p className="text-sm">
                    Cuando la ubicación se encuentra deshabilitada, está no
                    puede utilizarse en ningún evento nuevo.
                  </p>
                </div>
              </div>
            ) : null}

            {/* buttons */}
            <div className="flex justify-between w-2/3 mt-40  mx-auto">
              <Link
                className="bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                to="/locations"
              >
                Volver
              </Link>
              <Link
                className="bg-blue-500 text-white font-medium py-2 px-10 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                to={`/locations/${location?.id}/edit`}
              >
                Editar
              </Link>
              <button
                onClick={() => setShowMessage(!showMessage)}
                className="bg-red-500 text-white font-medium py-2 px-4 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Eliminar
              </button>
            </div>
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
