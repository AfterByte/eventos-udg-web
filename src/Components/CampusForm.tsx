import React from 'react'
import { Formik, FormikHelpers, Form, Field } from "formik";
import { campuses } from "../helpers/mockData";

interface props {
  title: string,
  changeShowForm: any,
  isCreate: boolean,
  campus: Values
}

interface Values {
  id: number, 
  name: string, 
  campus: string,
  image: string
}

export default function CampusForm(props:props) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
      <Formik
        initialValues={props.isCreate 
        ? {
          id: 0, 
          name: "", 
          campus: "",
          image: ""
        }
        : {
          id: props.campus.id, 
          name: props.campus.name, 
          campus: props.campus.campus,
          image: props.campus.image
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
        {propsF => (
          <div className="xl:ml-64">
            <div className="bg-white rounded mt-48 xl:mt-64 sm:mx-56 px-4 pb-4 xl:py-12 w-auto grid grid-cols-1">
              <div className="col-span-1 text-center">
                <p className="text-lg font-semibold pb-2">{props.title}</p>
              </div>
              <Form className="grid grid-cols-1">
                <label htmlFor="name" className="pb-2">Nombre</label>
                <Field id="name" name="name" placeholder="" className="border border-gray-500 rounded-sm py-2 px-2"/>
              </Form>
              <Form className="grid grid-cols-1 pt-4">
                <label htmlFor="campus" className="pb-2">Sede</label>
                <Field id="campus" name="campus" placeholder="" className="border border-gray-500 rounded-sm py-2 px-2"/>
              </Form>
              <Form className="grid grid-cols-1 pt-4">
                <input id="image" type="file" name="image" onChange={propsF.handleChange("file")} className=""/>
              </Form>
              <div className="col-span-1 flex justify-center pt-4">
                <button className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">Guardar</button>
              </div>
              <div className="col-span-1 flex justify-center pt-4">
                <button onClick={props.changeShowForm} className="px-6 py-2 bg-gray-500 text-sm font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">Volver</button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}