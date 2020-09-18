import React, { Component, useEffect, useState } from "react";
import Maps from "../Components/Maps";
import Search from "../Components/Search";
import CreateLocation from "../Components/CreateLocation";
import { Formik, FormikHelpers } from "formik";
import { IMarker } from "../Components/Maps";
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

const MapComponent = () => {
  const [address, setAddress] = useState("");

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
        initialValues={{
          name: "",
          location: "",
          address: "",
          capacity: 0,
          thirdParty: false,
          disabled: false,
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
              <CreateLocation address={address} setFieldValue={setFieldValue} />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default MapComponent;
