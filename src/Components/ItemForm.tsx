import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
//import styles
import "../assets/inputs.css";
//import imgs/svgs
import addIcon from "../assets/icons/add.svg";
import { Campus, Item, Message, Payload, Without } from "../helpers/payloads";
// Cotext and apiclient
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
import {
  ClientResponse,
  createCampus,
  updateCampus,
} from "../helpers/apiClient";
import { typeOf } from "../helpers/validationFunctions";

interface ItemFormProps {
  changeShowForm(): void | Promise<void>;
  items?: Item;
  getItems(): void;
  setShownItems(items: Item): void;
}

export default function ItemForm({
  changeShowForm,
  items,
  getItems,
  setShownItems,
}: ItemFormProps) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
      <Formik
        initialValues={{
          name: items?.name || "",
          countable: items?.countable || false,
        }}
        onSubmit={async (values: Payload<Item>, { setSubmitting }) => {
          setSubmitting(true);

          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form className="xl:ml-64">
          <div className="bg-white rounded mt-48 xl:mt-64 sm:mx-56 px-4 pb-4 xl:py-12 w-auto grid grid-cols-1">
            <div className="col-span-1 text-center">
              <p className="text-lg font-semibold pb-2">
                {items ? "Editar campus" : "Crear campus"}
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
            <div className="grid grid-cols-1 pt-4"></div>
            <div className="col-span-1 flex justify-center pt-4">
              <button className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
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
