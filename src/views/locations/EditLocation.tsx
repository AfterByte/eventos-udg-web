import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Custom components imports
import { LocationForm } from "../../components/forms";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
// Providers imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
// Payloads impors
import { Payload, Location } from "../../helpers/payloads";
import { typeOf } from "../../helpers/validationFunctions";
// API Client
import { getLocation, updateLocation } from "../../helpers/apiClient";

export default function EditLocation() {
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
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 flex flex-col">
        <Header barTitle="Editar ubicación" />
        <LocationForm writeAction={update} location={location} />
      </div>
    </div>
  );
}
