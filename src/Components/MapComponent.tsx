import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Maps from "../Components/Maps";
import Search from "../Components/Search";
import CreateLocation from "../Components/CreateLocation";
import { Formik, FormikHelpers } from "formik";
import { IMarker } from "../Components/Maps";
import EditLocation from "../Components/EditLocation";
import { locations } from "../helpers/mockData";

interface Values {
  name: string;
  location: string;
  address: string;
  capacity: number;
  thirdParty: boolean;
  disabled: boolean;
  latitude?: number;
  longitude?: number;
}

interface location{
  id: number, 
  name: string, 
  location: {city: string, state: string, address: string}, 
  capacity: number, 
  isAllowed: boolean,
  isEnabled: boolean,
  lat: number,
  lng: number,
  organizers: string[]
}

interface props {
  isCreate: boolean
}

const MapComponent = (props:props) => {
  const [address, setAddress] = useState("");
  const [ idLocation, setIdLocation ] = useState<{id:number}>(useParams());
  const [ location, setLocation ] = useState<location>(locations[idLocation.id]);

  /* TODO: change the initial values of Formik to use the real values of Location */

  const [
    marker,
    setMarker,
  ] = useState(/* {
    lat: 19.704939,
    lng: -103.457813,
    name: "Result",
  } */) as [
    IMarker | undefined,
    React.Dispatch<React.SetStateAction<IMarker>>
  ];
  /*  if (marker) markers.push(marker); */

  return (
    <div className="grid mt-24 ml-4">
      <Formik
        initialValues={props.isCreate 
        ? {
          name: "",
          location: "",
          address: "",
          capacity: 0,
          thirdParty: false,
          disabled: false,
        }
        : {
          name: location.name,
          location: "",
          address: "",
          capacity: location.capacity,
          thirdParty: location.isAllowed,
          disabled: location.isEnabled,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue }) => (
          <div className="flex">
            <div className="bg-white w-11/12 rounded">
              <Search
                setMarker={setMarker}
                setAddress={setAddress}
                marker={marker}
                address={address}
              />
              <Maps marker={marker} />
            </div>
            <div className="ml-4 bg-white w-full rounded">
              {props.isCreate 
              ? <CreateLocation address={address} setFieldValue={setFieldValue} />
              : <EditLocation address={address} setFieldValue={setFieldValue} />}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default MapComponent;
