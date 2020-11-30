import React, { useContext, useState } from "react";
// Custom components
import { Form, Formik } from "formik";
import EventFields from "./EventFields";
// Payload types
import {
  Event,
  Person,
  Reservation,
  Message,
  EventPayload,
  Tag,
  Optional,
} from "../../helpers/payloads";
// Helpers
import {
  ClientResponse,
  createEvent,
  updateEvent,
} from "../../helpers/apiClient";
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
import {
  getDateHour,
  toDateTime,
  typeOf,
} from "../../helpers/validationFunctions";
// Assets
import eventImage from "../../assets/images/events.svg";
import { useHistory } from "react-router-dom";

type EventFormProps = {
  event?: Event;
  reservation: Reservation;
};

export type EventFormFields = {
  name: string;
  description: string;
  startHour: string;
  endHour: string;
  capacity: number;
  tags: Optional<Tag>[];
  guests: Person[];
  reservation?: Reservation;
  image?: File;
};

const EventForm = ({ event, reservation }: EventFormProps) => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const history = useHistory();

  return (
    <Formik
      initialValues={{
        name: event?.name || "",
        description: event?.description || "",
        startHour: getDateHour(event?.reservation.start),
        endHour: getDateHour(event?.reservation.end),
        capacity: event?.capacity || 0,
        tags: event?.tags.map((tag) => tag.name) || [],
        guests: event?.guests || [],
        reservation: reservation,
      }}
      onSubmit={async (values: EventFormFields, { setSubmitting }) => {
        setSubmitting(true);

        let response: ClientResponse<Event | Message>;
        const payload: EventPayload = {
          name: values.name,
          capacity: values.capacity,
          description: values.description,
          reservation: {
            locationId: reservation.location.id,
            start: toDateTime(reservation.start, values.startHour).toString(),
            end: toDateTime(reservation.end, values.endHour).toString(),
          },
          tags: values.tags,
          people: values.guests.map((guest) => guest.id),
        };
        // Make request
        if (event) response = await updateEvent(apiClient, event.id, payload);
        else response = await createEvent(apiClient, payload, values.image);

        setSubmitting(false);

        if (response.status < 300 && typeOf<Event>("id", response.body)) {
          history.push(`/events/${response.body.id}`);
        }
      }}
    >
      {(props) => (
        <Form className="flex-grow flex flex-col overflow-auto lg:overflow-hidden">
          <div className="flex flex-col lg:flex-row bg-white rounded-md my-4 mx-auto p-4 pl-0 lg:overflow-hidden">
            <EventFields className="lg:order-2 lg:overflow-auto" {...props} />
            <div className="p-8 flex flex-col items-center justify-center lg:border-r">
              <img
                className="hidden lg:block"
                src={eventImage}
                alt="event"
                style={{ width: "28rem" }}
              />
              <button
                type="submit"
                className="px-3 py-2 mt-10 text-white text-lg xl:py-2 bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                <p>Crear evento</p>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default EventForm;
