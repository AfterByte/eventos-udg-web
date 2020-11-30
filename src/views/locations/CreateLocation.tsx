import React, { useContext } from "react";
// Payloads imports
import { Payload, Location } from "../../helpers/payloads";
// Custom components imports
import { LocationForm } from "../../components/forms";
import Header from "../../components/Header";
import TaskBar from "../../components/TaskBar";
import SideBar from "../../components/SideBar";
// Provider imports
import {
  AuthContext,
  AuthProviderPayload,
} from "../../components/AuthProvider";
import { createLocation } from "../../helpers/apiClient";

const CreateLocation = () => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const create = (location: Payload<Location>) => {
    return createLocation(apiClient, location);
  };

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 flex flex-col">
        <Header barTitle="Registrar ubicación" />
        <LocationForm writeAction={create} />
      </div>
    </div>
  );
};
export default CreateLocation;
