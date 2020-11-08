import ApiClient, { detachBody, jsonToFormdata } from ".";
import { ClientResponse } from ".";
import { Campus, Message, Optional, Payload, Without } from "../payloads";

export async function indexCampuses(
  client: ApiClient
): Promise<ClientResponse<{ campuses: Campus[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/campuses`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ campuses: Campus[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getCampus(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Campus | Message>> {
  try {
    const response = await fetch(`${client.url}api/campuses/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Campus>(response, "campus");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createCampus(
  client: ApiClient,
  campus: Payload<Without<Campus, "image">>,
  image?: File
): Promise<ClientResponse<Campus | Message>> {
  const formdata = jsonToFormdata(campus);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/campuses`, {
      method: "POST",
      headers,
      body: formdata,
    });
    const body = await detachBody<Campus>(response, "campus");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateCampus(
  client: ApiClient,
  id: string,
  campus: Optional<Payload<Without<Campus, "image">>>,
  image?: File
): Promise<ClientResponse<Campus | Message>> {
  const formdata = jsonToFormdata(campus);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/campuses/${id}`, {
      method: "PATCH",
      headers: headers,
      body: formdata,
    });
    const body = await detachBody<Campus>(response, "campus");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deleteCampus(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/campuses/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getCampusLocations(
  client: ApiClient,
  id: string
): Promise<
  ClientResponse<{ locations: Without<Location, "campuses">[] } | Message>
> {
  try {
    const response = await fetch(`${client.url}api/campuses/${id}/locations`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{
      locations: Without<Location, "campuses">[];
    }>(response, "locations");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
