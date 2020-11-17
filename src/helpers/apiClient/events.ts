import formUrlEncoded from "form-urlencoded";
import ApiClient, { detachBody, jsonToFormdata } from ".";
import { ClientResponse } from ".";
import { Event, EventSearch, Message, Optional, Without } from "../payloads";

type EventPayload = {
  name: string;
  capacity: number;
  description: string;
  people?: string[];
  tags?: string[];
  reservation: {
    locationId: string;
    start: string;
    end: string;
  };
};

export async function indexEvents(
  client: ApiClient,
  search?: EventSearch
): Promise<ClientResponse<{ events: Event[] } | Message>> {
  try {
    const query = formUrlEncoded(search);
    const response = await fetch(`${client.url}api/events?${query}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ events: Event[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function upcomingEvents(client: ApiClient, page = 1) {
  return await indexEvents(client, { preset: "upcoming", page });
}

export async function getEvent(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Event | Message>> {
  try {
    const response = await fetch(`${client.url}api/events/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Event>(response, "event");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createEvent(
  client: ApiClient,
  event: EventPayload,
  image?: File
): Promise<ClientResponse<Event | Message>> {
  const formdata = jsonToFormdata(event);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/events`, {
      method: "POST",
      headers,
      body: formdata,
    });
    const body = await detachBody<Event>(response, "event");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateEvent(
  client: ApiClient,
  id: string,
  event: Optional<EventPayload>,
  image?: File
): Promise<ClientResponse<Event | Message>> {
  const formdata = jsonToFormdata(event);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/events/${id}`, {
      method: "PATCH",
      headers: headers,
      body: formdata,
    });
    const body = await detachBody<Event>(response, "event");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateEventStatus(
  client: ApiClient,
  id: string,
  status: { status: string }
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/events/${id}`, {
      method: "PUT",
      headers: client.headers,
      body: JSON.stringify(status),
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deleteEvent(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/events/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
