import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Custom components imports
import LocationForm from "../Components/LocationForm";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import SideBar from "../Components/SideBar";
// Providers imports
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
// Payloads impors
import { Payload, Location } from "../helpers/payloads";
import { typeOf } from "../helpers/validationFunctions";
// API Client
import { getLocation, updateLocation } from "../helpers/apiClient";

export default function LocationEdit() {
  // Context
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  // Params
  const { id } = useParams<{ id: string }>();
  // States
  const [location, setLocation] = useState<Location>();
  // Effect
  useEffect(() => {
    const findLocation = async () => {
      const location = (await getLocation(apiClient, id)).body;
      if (typeOf<Location>("id", location)) setLocation(location);
      else console.log(location);
    };
    if (!location) findLocation();
  });

  const update = (l: Payload<Location>) => {
    return updateLocation(apiClient, id, l);
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
                <Header barTitle={"Editar Ubicación"} />
                <Taskbar />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-4 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <LocationForm writeAction={update} location={location} />
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
