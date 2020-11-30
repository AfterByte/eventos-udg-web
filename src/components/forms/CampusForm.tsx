import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
//import styles
import "../../assets/inputs.css";
//import imgs/svgs
import addIcon from "../../assets/icons/add.svg";
import { Campus, Message, Payload, Without } from "../../helpers/payloads";
// Cotext and apiclient
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
import {
  ClientResponse,
  createCampus,
  updateCampus,
} from "../../helpers/apiClient";
import { typeOf } from "../../helpers/validationFunctions";

interface CampusFormProps {
  changeShowForm(): void | Promise<void>;
  campus?: Campus;
  getCampuses(): void;
  setShownCampus(campus: Campus): void;
}

export default function CampusForm({
  changeShowForm,
  campus,
  getCampuses,
  setShownCampus,
}: CampusFormProps) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const [image, setImage] = useState<File>();

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
  };

  return (
    <div className="absolute bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <Formik
        initialValues={{
          name: campus?.name || "",
          city: campus?.city || "",
        }}
        onSubmit={async (
          values: Payload<Without<Campus, "image">>,
          { setSubmitting }
        ) => {
          setSubmitting(true);

          let response: ClientResponse<Campus | Message>;
          // Make request
          if (campus)
            response = await updateCampus(apiClient, campus.id, values, image);
          else response = await createCampus(apiClient, values, image);

          setSubmitting(false);

          if (response.status < 300 && typeOf<Campus>("id", response.body)) {
            setShownCampus(response.body);
            getCampuses();
            changeShowForm();
          }
        }}
      >
        <Form className="mx-16">
          <div className="bg-white rounded m-auto p-4">
            <div className="text-center">
              <p className="text-lg font-semibold pb-2">
                {campus ? "Editar campus" : "Crear campus"}
              </p>
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="name" className="pb-2">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="border border-gray-500 rounded-sm py-2 px-2"
              />
            </div>
            <div className="grid grid-cols-1 pt-4">
              <label htmlFor="campus" className="pb-2">
                Sede
              </label>
              <Field
                id="city"
                name="city"
                className="border border-gray-500 rounded-sm py-2 px-2"
              />
            </div>
            <div className="grid grid-cols-1 pt-4">
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleImageInput}
              />
              <div className="flex items-center">
                <label
                  htmlFor="image"
                  className="bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                >
                  <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
                </label>
                <p>{image?.name || "Selecciona una imagen"}</p>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Guardar
              </button>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={changeShowForm}
                className="px-6 py-2 bg-gray-500 text-sm font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Volver
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
