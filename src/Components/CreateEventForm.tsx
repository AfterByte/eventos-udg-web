import React from "react";
/**IMPORT FORMIK */
import { Field, FieldArray, Form, Formik, FormikHelpers, FormikProps, setNestedObjectValues } from "formik";
import "react-app-polyfill/ie11";
//import image
import eventImage from "../assets/images/events.svg";
import addIcon from "../assets/icons/add.svg";
import Search from '../assets/icons/search-black.svg';

function CreateEventForm(propsF:any) {
  return (
    <form className="w-full">
      <Form className="flex">  
        <div className="w-full xl:w-6/12 flex flex-col align-middle justify-center border-r">
          <img className="h-64 mt-48 mb-16" src={eventImage} alt="Event creation image"/>
          <button type="submit" className="font-small px-1 py-1 xl:font-semibold text-white mx-32 xl:mt-12 xl:py-2 bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
            <p>Crear evento</p>
          </button>
        </div>
        
        <div className="w-full xl:w-6/12 border-l">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="ml-4 mt-4 mb-2 text-xl font-semibold">Nombre del evento</label>
            <Field 
              id="name"
              name="name"
              type="text"
              className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="description" className="ml-4 mt-4 mb-2 text-xl font-semibold">Descripción</label>
            <Field as="textarea"
              id="description"
              name="description"
              type="text"
              className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 h-40"
            />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-6/12">
              <label htmlFor="startEventDate" className="ml-4 mt-4 mb-2 text-xl font-semibold">Inicio del evento</label>
              <Field 
                id="startEventDate"
                name="startEventDate"
                type="text"
                className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
                placeholder="xx/xx/xxxx"
              />
              <p className="ml-4">Fecha</p>
            </div>

            <div className="flex flex-col w-6/12 mt-1">
              {/* TODO: Hour form */}
              <label htmlFor="startEventHour"></label>
              <Field
                id="startEventHour"
                name="startEventHour"
                type="number"
                className="border-2 border-gray-500 py-2 mr-24 rounded-md px-2 mt-12 pb-3 "
              />
              <p className="ml-1">Hora</p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-6/12">
              <label htmlFor="endEventDate" className="ml-4 mt-4 mb-2 text-xl font-semibold">Fin del evento</label>
              <Field 
                id="endEventDate"
                name="endEventDate"
                type="text"
                className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
                placeholder="xx/xx/xxxx"
              />
              <p className="ml-4">Fecha</p>
            </div>

            <div className="flex flex-col w-6/12 mt-1">
              {/* TODO: Hour form */}
              <label htmlFor="endEventHour"></label>
              <Field
                id="endEventHour"
                name="endEventHour"
                type="number"
                className="border-2 border-gray-500 py-2 mr-24 rounded-md px-2 mt-12 pb-3 "
              />
              <p className="ml-1">Hora</p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-9/12">
              <label htmlFor="location" className="ml-4 mt-4 mb-2 text-xl font-semibold">Ubicación</label>
              <Field 
                id="location"
                name="location"
                type="text"
                className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
              />
            </div>

            <div className="flex flex-col w-3/12">
              <p className="mt-6 mb-1 font-semibold text-center">Capacidad</p>
              <Field 
                id="capacity"
                name="capacity"
                type="number"
                className="border-2 border-gray-500 py-2 rounded-md px-2 mx-4 mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="description" className="ml-4 mt-4 mb-2 text-xl font-semibold">Etiquetas</label>
            <Field as="textarea"
              id="tags"
              name="tags"
              type="text"
              className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 h-24"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="ml-4 mt-4 mb-2">
              <input
                id="imageUrl"
                type="file"
                name="imageUrl"
                onChange={propsF.handleChange("image")}
              />
              <div className="flex items-center">
                <label
                  htmlFor="imageUrl"
                  className="bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                >
                  <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
                </label>
                <Field
                  name="image"
                  placeholder="Añadir imagen del evento"
                  className="w-full"
                ></Field>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div>
              <p className="ml-4 mb-2 text-xl font-semibold">Participantes <span className="pl-4 text-base">(Anfitriones, expositores e invitados en general)</span></p>
            </div>
            {/* SEARCH BAR */}
            <div>
              <div className="grid grid-cols-1 mx-4 mb-2">
                <div className="col-span-1 sm:col-span-2 flex ml-2 sm:ml-0 justify-center sm:justify-end">
                  <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                    <label className="flex w-full h-full mr-2 sm:mr-0 border border-gray-500 border-opacity-50">
                      <img className="h-full sm:py-0 py-2 px-2 bg-gray-500 bg-opacity-50" style={{opacity: "0.5"}} src={Search} alt={"SearchIcon"}/>
                      <input className="sm:mr-0 px-1 bg-gray-500 bg-opacity-25 w-full" type="text" name="buscar" placeholder="Buscar personas"/>
                    </label>
                    <div className="hidden sm:grid mr-2 px-6 py-2 text-md font-normal text-white bg-teal-500 items-center">Buscar</div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <FieldArray name="guests">
                {({insert, remove, push}) => (
                  <div>
                    {propsF.values.guests.length > 0 && propsF.values.guests.map((index:any) => (
                      <div>
                        <label htmlFor={`guests.${index}.name`}></label>
                        <Field
                          name={`guests.${index}.name`}
                          placeholder=""
                          type="text"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
          </div>
        </div>
      </Form>
    </form>
  );
}
export default CreateEventForm;