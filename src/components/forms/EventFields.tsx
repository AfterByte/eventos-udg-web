import React from "react";
// Custom components
import { Field, FormikProps } from "formik";
import Search from "../elements/Search";
import TagsSuggestions from "../searchSuggestions/TagsSuggestions";
import Guest from "../Guest";
// Payload types
import { EventFormFields } from "./EventForm";
// Helpers
import { dateToIso, formatStrTag } from "../../helpers/validationFunctions";
// Assets
import addIcon from "../../assets/icons/add.svg";
import Clear from "../../assets/icons/clear-black.svg";
import PeopleSuggestions, {
  PeopleSearchOpts,
} from "../searchSuggestions/PeopleSuggestions";
import { Person } from "../../helpers/payloads";

type EventFieldsProps = {
  className?: string;
} & FormikProps<EventFormFields>;

export default function EventFields({
  className,
  values,
  setFieldValue,
}: EventFieldsProps) {
  const { tags, guests, reservation, capacity, image } = values;

  const setTag = (input: string) => {
    input = formatStrTag(input);
    if (tags.find((tag) => tag.name === input)) return;
    setFieldValue("tags", [...tags, { name: input }]);
  };

  const removeTag = (index: number) => {
    tags.splice(index, 1);
    setFieldValue("tags", tags);
  };

  const setPerson = (person: Person) => {
    if (guests.find((guest) => guest.id === person.id)) return;
    setFieldValue("guests", [...guests, person]);
  };

  const removePerson = (index: number) => {
    guests.splice(index, 1);
    setFieldValue("guests", guests);
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFieldValue("image", event.target.files[0]);
  };

  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <label htmlFor="name" className="ml-4 mt-4 mb-2 text-xl font-semibold">
          Nombre del evento
        </label>
        <Field
          id="name"
          name="name"
          type="text"
          className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
        />
      </div>

      {/* EVENT DESCRIPTION */}
      <div className="flex flex-col w-full">
        <label
          htmlFor="description"
          className="ml-4 mt-4 mb-2 text-xl font-semibold"
        >
          Descripción
        </label>
        <Field
          as="textarea"
          id="description"
          name="description"
          type="text"
          className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 h-40"
        />
      </div>

      {/* EVENT BEGIN DATE */}
      <div className="flex w-full">
        <div className="flex flex-col w-6/12">
          <label
            htmlFor="startEventHour"
            className="ml-4 mt-4 mb-2 text-xl font-semibold"
          >
            Inicio del evento
          </label>
          <p
            id="startEventDate"
            className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
          >
            {dateToIso(reservation?.start).split("/").reverse().join("/")}
          </p>
          <p className="ml-4">Fecha</p>
        </div>

        <div className="flex flex-col w-6/12 mt-1">
          <Field
            id="startEventHour"
            name="startEventHour"
            type="time"
            className="border-2 border-gray-500 py-2 mr-24 rounded-md px-2 mt-12"
          />
          <p className="ml-1">Hora</p>
        </div>
      </div>

      {/* EVENT END DATE */}
      <div className="flex w-full">
        <div className="flex flex-col w-6/12">
          <label
            htmlFor="endEventHour"
            className="ml-4 mt-4 mb-2 text-xl font-semibold"
          >
            Fin del evento
          </label>
          <p
            id="endEventDate"
            className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
          >
            {dateToIso(reservation?.end).split("/").reverse().join("/")}
          </p>
          <p className="ml-4">Fecha</p>
        </div>

        <div className="flex flex-col w-6/12 mt-1">
          <Field
            id="endEventHour"
            name="endEventHour"
            type="time"
            className="border-2 border-gray-500 py-2 mr-24 rounded-md px-2 mt-12"
          />
          <p className="ml-1">Hora</p>
        </div>
      </div>

      {/* EVENT LOCATION */}
      <div className="flex w-full">
        <div className="flex flex-col w-9/12">
          <label
            htmlFor="location"
            className="ml-4 mt-4 mb-2 text-xl font-semibold"
          >
            Ubicación
          </label>
          <p
            id="location"
            className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2"
          >
            {reservation?.location.name}
          </p>
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

      {/* EVENT IMAGE */}
      <div className="flex flex-col w-full">
        <label
          htmlFor="description"
          className="ml-4 mt-4 mb-2 text-xl font-semibold"
        >
          Imagen
        </label>
        <div className="flex flex-col w-full">
          <div className="ml-4 mb-2">
            <input
              id="imageUrl"
              type="file"
              name="imageUrl"
              onChange={handleImageInput}
            />
            <label htmlFor="imageUrl" className="flex items-center">
              <img
                className="w-12 h-12 bg-white rounded-full shadow-lg mr-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                src={addIcon}
                alt="AddIcon"
              />
              <p className="w-full">
                {image ? image.name : "Añadir imagen del evento"}
              </p>
            </label>
          </div>
        </div>
      </div>

      {/* EVENT TAGS */}
      <div className="flex flex-col w-full">
        <p className="ml-4 mt-4 mb-2 text-xl font-semibold">Etiquetas</p>

        {/* Tags search bar */}
        <Search
          className="m-4"
          submit={setTag}
          placeholder="Buscar o crear etiquetas"
          buttonText="Agregar"
          Suggestions={TagsSuggestions}
        />

        <div
          className="border-2 border-gray-500 py-2 mx-4 rounded-md px-2 flex flex-wrap max-w-sm"
          style={{ minHeight: "4rem" }}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex bg-gray-200 rounded-full border border-gray-500 border-dashed my-1 px-4 py-1 text-sm text-gray-700 mx-1"
            >
              <p className="col-span-5 my-auto truncate">{tag.name}</p>
              <button onClick={() => removeTag(index)}>
                <img className="h-4 ml-1" src={Clear} alt={"Clear tag icon"} />
              </button>
            </span>
          ))}
        </div>

        {/* EVENT PARTICIPANTS */}
        <div className="flex flex-col w-full lg:mb-40">
          <p className="ml-4 mt-4 mb-2 text-xl">
            <span className="font-semibold">Participantes</span>
            <span className="ml-2 text-base">
              (Anfitriones, expositores e invitados en general)
            </span>
          </p>
          {/* People search bar */}
          <Search<PeopleSearchOpts>
            className="m-4 mb-4"
            submit={() => {}}
            placeholder="Buscar personas"
            Suggestions={PeopleSuggestions}
            suggestionsOptions={{ setPerson, showPersonForm: () => {} }}
          />

          <div className="border-gray-500 py-2 mx-4 rounded-md px-2 flex overflow-x-auto items-center justify-center max-w-sm">
            {guests.map((guest, index) => (
              <Guest className="mx-2 flex-shrink-0" guest={guest} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
