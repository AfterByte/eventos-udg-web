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
/**ALERTS WITH SWEETALERT */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

  const history = useHistory();
  const allClean = 0;

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
    /**VALIDATIONS */

    if (values.name == "") {
      Toast.fire({
        icon: "error",
        title: "El campo nombre esta vacio",
      });
    } else if (values.city == "") {
      Toast.fire({
        icon: "error",
        title: "El campo localidad esta vacio",
      });
    } else if (values.address == "") {
      /*  MySwal.fire(
        "El campo domicilio esta vacio",
        "Escriba su domicilio en la barra de busqueda",
        "info"
      ); */
      Toast.fire({
        icon: "error",
        title: "El campo domicilio esta vacio",
        footer: "Busque la dirreccion en la barra",
      });
    } else if (values.max_capacity == 0) {
      Toast.fire({
        icon: "warning",
        title: "La capacidad debe ser mayor a 0",
      });
    } else {
      setSubmitting(false);
      if (marker) {
        const newLocation: LocationPayload = {
          ...values,
          max_capacity: +values.max_capacity,
          latitude: marker.lat,
          longitude: marker.lng,
        };
        const response = await writeAction(newLocation);
        Toast.fire({
          icon: "success",
          title: "Localidad creada/modificada con exito",
        });
        if (response.body && typeOf<Location>("id", response.body))
          history.push(`/locations/${response.body.id}`);
        else console.log(response);
      } else console.log("Missing marker!");
      setSubmitting(true);
    }
  };

  /**END VALIDATIONS */

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
