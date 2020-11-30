import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
// Assets
import "../../assets/inputs.css";
// Cotext and apiclient
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
// Helpers and payloads
import { Item, Message, Payload } from "../../helpers/payloads";
import {
  ClientResponse,
  createItem,
  updateItem,
} from "../../helpers/apiClient";
import { typeOf } from "../../helpers/validationFunctions";

interface ItemFormProps {
  changeShowForm(): void | Promise<void>;
  item?: Item;
  getItems(): void;
  setShownItem(item: Item): void;
}

export default function ItemForm({
  changeShowForm,
  item,
  getItems,
  setShownItem,
}: ItemFormProps) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  return (
    <div className="absolute bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <Formik
        initialValues={{
          name: item?.name || "",
          countable: item?.countable || false,
        }}
        onSubmit={async (values: Payload<Item>, { setSubmitting }) => {
          setSubmitting(true);

          let response: ClientResponse<Item | Message>;
          // Make request
          if (item) response = await updateItem(apiClient, item.id, values);
          else response = await createItem(apiClient, values);

          setSubmitting(false);

          if (response.status < 300 && typeOf<Item>("id", response.body)) {
            setShownItem(response.body);
            getItems();
            changeShowForm();
          }
        }}
      >
        <Form className="mx-16">
          <div className="bg-white rounded m-auto p-4">
            <div className="text-center">
              <p className="text-lg font-semibold pb-2">
                {item ? "Editar objeto" : "Crear objeto"}
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
            <div className="flex">
              <label htmlFor="campus" className="pb-2">
                ¿Objecto contable?
              </label>
              <Field
                id="countable"
                name="countable"
                className="border border-gray-500 rounded-sm py-2 px-2 ml-4 mb-1"
                type="checkbox"
              />
            </div>
            <div className="col-span-1 flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Guardar
              </button>
            </div>
            <div className="col-span-1 flex justify-center pt-4">
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
