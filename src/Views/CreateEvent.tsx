import React, { useContext, useState } from "react";
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
//import components
import SideBar from "../Components/SideBar";
import EventCard, { Event } from "../Components/EventCard";
import Header from "../Components/Header";
import Maps from "../Components/Maps";
import CreateEventForm from "../Components/CreateEventForm";
import { Field, FieldArray, Form, Formik, FormikHelpers, setNestedObjectValues } from "formik";
//import image
import eventImage from "../assets/images/events.svg";
import addIcon from "../assets/icons/add.svg";
import Search from '../assets/icons/search-black.svg';
import Clear from "../assets/icons/clear-black.svg";

interface Tags{
  tag: string
}

interface Values {
  name: string,
  description: string,
  startEventDate: string,
  startEventHour: string,
  endEventDate: string,
  endEventHour: string,
  location: string,
  capacity: string,
  tags: Tags[],
  imageUrl: string,
  guests: [{name : string}]
}

export default function CreateEvent() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const [ showGuest, setShowGuest ] = useState(true);
  const [ tags, setTags] = useState([""]);
  const [ showTag, setShowTag] = useState(false);

  const deleteTag = (e:any, tag:string) => {
    e.preventDefault()
    const stringID = tags.indexOf(tag)
    setTags(
      [...tags.filter(tagS => stringID !== tags.indexOf(tagS))]
      )
  }

  const changeForm = (e:any, arrayHelpers:any) => {
    e.preventDefault();
    arrayHelpers.push('');
  }

  const remove = (e:any, arrayHelpers:any, index:number) => {
    e.preventDefault();
    arrayHelpers.remove(index);
  }

  const insert = (e:any, arrayHelpers:any, index:number) => {
    e.preventDefault();
    arrayHelpers.insert(index, '');
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-6 h-screen">
        <div
          className={
            !sidebarHidden
              ? "hidden sm:grid sm:col-span-1 sm:fixed sm:h-full sm:z-20 sm:w-1/6"
              : "col-span-6 sm:grid sm:col-span-1 z-20 sm:fixed h-full"
          }
        >
          <SideBar />
        </div>
        {!sidebarHidden ? (
          <div className="fixed z-10 w-full">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-start-2 sm:col-end-7">
                <Header barTitle={"Crear evento"} />
                
                {/* Second white bar with secondary tittle */}
                <div className="col-start-2 col-end-7 w-full">
                  <div className="text-lg shadow-md text-center w-full md:w-full h-auto items-center py-2 sm:py-5 bg-white mt-0 sm:mt-2">
                    <p>Registra tu evento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <div className="grid grid-cols-12 mt-6 sm:mt-24 mb-4 sm:mb-8">
              {/* TODO: Export to a different component */}
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  startEventDate: "",
                  startEventHour: "",
                  endEventDate: "",
                  endEventHour: "",
                  location: "",
                  capacity: "",
                  tags: [{tag: ''}],
                  imageUrl: "",
                  guests: [{name: ''}]

                }}
                enableReinitialize
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
                {(propsF) => {
                  return (
                    <div className="col-start-3 col-end-11 flex flex-wrap bg-white w-full h-auto rounded-lg shadow-md relative">
                       <form className="w-full">
                        <Form className="flex">  
                          <div className="w-full xl:w-6/12 flex flex-col align-middle justify-center border-r">
                            <img className="h-64 mt-48 mb-16" src={eventImage} alt="Event creation image"/>
                            
                            {/* EVENT CREATION BUTTON */}
                            <button type="submit" className="font-small px-1 py-1 xl:font-semibold text-white mx-32 xl:mt-12 xl:py-2 bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                              <p>Crear evento</p>
                            </button>
                          </div>
                          
                          {/* EVENT NAME */}
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

                            {/* EVENT DESCRIPTION */}
                            <div className="flex flex-col w-full">
                              <label htmlFor="description" className="ml-4 mt-4 mb-2 text-xl font-semibold">Descripción</label>
                              <Field as="textarea"
                                id="description"
                                name="description"
                                type="text"
                                className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 h-40"
                              />
                            </div>

                            {/* EVENT BEGIN DATE */}
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

                            {/* EVENT END DATE */}
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

                            {/* EVENT LOCATION */}
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

                              {/* EVENT CAPACITY */}
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

                            {/* EVENT TAGS */}
                            <div className="flex flex-col w-full">
                              <label htmlFor="description" className="ml-4 mt-4 mb-2 text-xl font-semibold">Etiquetas</label>
                              <div className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 h-auto flex">
                                <FieldArray name="tags"
                                render={arrayHelpers => (
                                  <div className="grid grid-cols-2">
                                    {propsF.values.tags && propsF.values.tags.length > 0 ? (
                                      propsF.values.tags.map((tag, index) => (
                                      <div className="items-center mr-8">
                                        <label htmlFor={`tags.${index}.name`}></label>
                                        <div className="flex">
                                          <Field
                                            name={`tags.${index}.name`}
                                            placeholder=""
                                            type="text"
                                            className="bg-gray-200 my-1 w-32 rounded-full border border-gray-500 border-dashed px-2 py-1 text-xs sm:text-sm font-semibold text-gray-700 items-center"
                                          />
                                          <button onClick={(e) => remove(e, arrayHelpers, index)}><img className="h-6 mr-3" src={Clear} alt={"ClearTagIcon"}/></button>
                                          <button onClick={(e) => insert(e, arrayHelpers, index)}><img className="h-6 mr-3 rounded-full shadow-lg" src={addIcon} alt="AddIcon" /></button>
                                        </div>
                                      </div>
                                    )))
                                    : <button onClick={(e) => changeForm(e, arrayHelpers)} className="ml-40 py-2">
                                      <div className="flex items-center mt-1 w-40">
                                        <p>Añade un tag</p>
                                        <img className="w-10 h-10 ml-2 rounded-full shadow-lg" src={addIcon} alt="AddIcon" />
                                      </div>
                                    </button>}
                                  </div>
                                )}/>
                              </div>
                              <div className="hidden col-span-1 py-1 ml-2 sm:ml-0 sm:pb-0 sm:col-span-4  lg:flex justify-end">
                                {tags.map(tag => (
                                  <span className={showTag 
                                                    ? "grid grid-cols-6 bg-gray-200 my-1 sm:my-0 rounded-full border border-gray-500 border-dashed px-2 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 items-center" 
                                                    : "hidden"}>
                                    <p className="col-span-5">{tag}</p>
                                    <button onClick={(e) => deleteTag(e, tag)}><img className="h-4 ml-1" src={Clear} alt={"ClearTagIcon"}/></button>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* EVENT IMAGE */}
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

                            {/* EVENT PARTICIPANTS */}
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
                              <div className="pb-4">
                                <FieldArray name="guests"
                                  render={arrayHelpers => (
                                    <div>
                                      {propsF.values.guests && propsF.values.guests.length > 0 ? (
                                        propsF.values.guests.map((guest, index) => (
                                        <div className="items-center">
                                          <label htmlFor={`guests.${index}.name`}></label>
                                          <div className="flex">
                                            <Field
                                              name={`guests.${index}.name`}
                                              placeholder=""
                                              type="text"
                                              className="border-2 border-gray-500 py-2 mx-4 rounded-md"
                                            />
                                            <button onClick={(e) => remove(e, arrayHelpers, index)}><img className="h-6" src={Clear} alt={"ClearTagIcon"}/></button>
                                            <button onClick={(e) => insert(e, arrayHelpers, index)}><img className="h-6 ml-4 rounded-full shadow-lg" src={addIcon} alt="AddIcon" /></button>
                                          </div>
                                        </div>
                                      )))
                                      : <button onClick={(e) => changeForm(e, arrayHelpers)} className=" ml-40 py-2">
                                        <div className="flex items-center ">
                                          <p>Registra un participante</p>
                                          <img className="w-10 h-10 rounded-full shadow-lg" src={addIcon} alt="AddIcon" />
                                        </div>
                                      </button>}
                                    </div>
                                  )}/>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </form>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
