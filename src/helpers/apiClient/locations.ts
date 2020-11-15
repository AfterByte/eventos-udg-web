import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import {
  Message,
  Optional,
  Payload,
  Without,
  Location,
  Event,
} from "../payloads";

/* Locations requests */

export async function indexLocations(
  client: ApiClient
): Promise<
  ClientResponse<{ locations: Without<Location, "campuses">[] } | Message>
> {
  try {
    const response = await fetch(`${client.url}api/locations`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{
      locations: Without<Location, "campuses">[];
    }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getLocation(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Location | Message>> {
  try {
    const response = await fetch(`${client.url}api/locations/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Location>(response, "location");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createLocation(
  client: ApiClient,
  location: Payload<Without<Location, "campuses">>
): Promise<ClientResponse<Location | Message>> {
  try {
    const response = await fetch(`${client.url}api/locations`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(location),
    });
    const body = await detachBody<Location>(response, "location");
    return { body, status: response.status };
  } catch (error) {
    console.error(error);
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateLocation(
  client: ApiClient,
  id: string,
  location: Optional<Payload<Without<Location, "campuses">>>
): Promise<ClientResponse<Location | Message>> {
  try {
    const response = await fetch(`${client.url}api/locations/${id}`, {
      method: "PATCH",
      headers: client.headers,
      body: JSON.stringify(location),
    });
    const body = await detachBody<Location>(response, "location");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deleteLocation(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/locations/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function addCampusesToLocation(
  client: ApiClient,
  id: string,
  campuses: string[]
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/locations/${id}`, {
      method: "PUT",
      headers: client.headers,
      body: JSON.stringify({ campuses }),
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function upcomingLocationEvents(
  client: ApiClient,
  id: string
): Promise<ClientResponse<{ events: Event[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/locations/${id}/events`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ events: Event[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
