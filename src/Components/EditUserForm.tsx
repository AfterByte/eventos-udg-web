import React, { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
//import styles
import "../assets/inputs.css";
//import types
import { Role } from "../helpers/payloads"
import { roles } from "../helpers/mockData"

interface UserFormProps {
  changeShowForm: any;
  role: Role;
}

export default function EditUserForm(props: UserFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
      <Formik
        initialValues={
          {
            id: props.role.id,
            name: props.role.name
          }
        }
        onSubmit={(
          values: Role,
          { setSubmitting }: FormikHelpers<Role>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {(propsF) => (
          <form onSubmit={propsF.handleSubmit} className="xl:ml-64">
            <div className="bg-white rounded mt-48 xl:mt-64 sm:mx-56 px-4 pb-4 xl:py-12 w-auto grid grid-cols-1">
              <div className="col-span-1 text-center">
                <p className="text-lg font-semibold pb-2">Editar cuenta de usuario</p>
              </div>
              <Form className="grid grid-cols-1 py-8">
                <label htmlFor="name" className="pb-2 text-center">
                  Tipo de cuenta
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder=""
                  as="select"
                  className="border border-gray-500 rounded-sm py-2 px-2 xl:mx-56"
                >
                  {roles.map(roleInfo => (
                    roleInfo.id === props.role.id 
                    ? <option value={roleInfo.name} selected>{roleInfo.name}</option>
                    : <option value={roleInfo.name}>{roleInfo.name}</option>
                  ))}
                </Field>
              </Form>
              <div className="col-span-1 flex justify-center pt-4">
                <button className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                  Guardar
                </button>
              </div>
              <div className="col-span-1 flex justify-center pt-4">
                <button
                  onClick={props.changeShowForm}
                  className="px-6 py-2 bg-gray-500 text-sm font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                >
                  Volver
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
