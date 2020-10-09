import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Payloads imports
import { Location, Without, Payload, Message } from "../helpers/payloads";
import { ClientResponse } from "../helpers/apiClient";
// Helper components
import { typeOf } from "../helpers/validationFunctions";
// Components imports
import Maps, { IMarker } from "./Maps";
import Search from "./Search";
import LocationFields from "./LocationFields";
import { Formik, FormikHelpers } from "formik";

type LocationPayload = {} & Payload<Location>;
type FormFields = {} & Without<
  Without<LocationPayload, "latitude">,
  "longitude"
>;

type LocationFromProps = {
  location?: Location;
  writeAction(l: LocationPayload): Promise<ClientResponse<Location | Message>>;
};

const LocationForm = ({ location, writeAction }: LocationFromProps) => {
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<IMarker>();

  const history = useHistory();

  useEffect(() => {
    if (!marker && location)
      setMarker({
        lat: location.latitude,
        lng: location.longitude,
        name: "Ubicación",
      });
  });

  const submit = async (
    values: FormFields,
    { setSubmitting }: FormikHelpers<FormFields>
  ) => {
    setSubmitting(false);
    if (marker) {
      console.log(values);
      const newLocation: LocationPayload = {
        ...values,
        max_capacity: +values.max_capacity,
        latitude: marker.lat,
        longitude: marker.lng,
      };
      const response = await writeAction(newLocation);
      if (response.body && typeOf<Location>("id", response.body))
        history.push(`/locations/${response.body.id}`);
      else console.log(response);
    } else console.log("Missing marker!");
    setSubmitting(true);
  };

  return (
    <div className="grid mt-24 ml-4">
      <Formik
        initialValues={{
          name: location?.name || "",
          address: location?.address || "",
          max_capacity: location?.max_capacity || 0,
          third_party: location?.third_party || false,
          disabled: location?.disabled || false,
          city: location?.city || "",
        }}
        enableReinitialize
        onSubmit={submit}
      >
        {({ setFieldValue }) => {
          return (
            <div className="flex">
              <div className="p-4 bg-white w-11/12 rounded">
                <Search
                  setMarker={setMarker}
                  setAddress={setAddress}
                  marker={marker}
                  address={address}
                />
                <div style={{ height: "62vh", width: "100%" }}>
                  <Maps marker={marker} />
                </div>
              </div>
              <div className="ml-4 bg-white w-full rounded">
                <LocationFields
                  address={address}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default LocationForm;
