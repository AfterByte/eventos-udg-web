import ApiClient, { detachBody, jsonToFormdata } from ".";
import { ClientResponse } from ".";
import {
  Message,
  Optional,
  Payload,
  Person,
  Search,
  Without,
} from "../payloads";
import formUrlEncoded from "form-urlencoded";

export async function indexPeople(
  client: ApiClient,
  search?: Search
): Promise<ClientResponse<{ people: Person[] } | Message>> {
  const query = formUrlEncoded(search);
  try {
    const response = await fetch(`${client.url}api/people?${query}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ people: Person[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getPerson(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Person | Message>> {
  try {
    const response = await fetch(`${client.url}api/people/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Person>(response, "person");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createPerson(
  client: ApiClient,
  person: Payload<Without<Person, "image">>,
  image?: File
): Promise<ClientResponse<Person | Message>> {
  const formdata = jsonToFormdata(person);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/people`, {
      method: "POST",
      headers,
      body: formdata,
    });
    const body = await detachBody<Person>(response, "person");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updatePerson(
  client: ApiClient,
  id: string,
  person: Optional<Payload<Without<Person, "image">>>,
  image?: File
): Promise<ClientResponse<Person | Message>> {
  const formdata = jsonToFormdata(person);
  if (image) formdata.append("image", image);
  try {
    const headers = client.headers;
    delete headers["Content-Type"];
    const response = await fetch(`${client.url}api/people/${id}`, {
      method: "PATCH",
      headers: headers,
      body: formdata,
    });
    const body = await detachBody<Person>(response, "person");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deletePerson(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/people/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
