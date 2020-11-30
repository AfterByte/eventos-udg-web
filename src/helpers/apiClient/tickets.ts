import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Message, Ticket } from "../payloads";

export async function indexTickets(
  client: ApiClient
): Promise<ClientResponse<{ tickets: Ticket[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/tickets`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ tickets: Ticket[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function ownedTickets(
  client: ApiClient
): Promise<ClientResponse<{ tickets: Ticket[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/profile/tickets`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ tickets: Ticket[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getTicket(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Ticket | Message>> {
  try {
    const response = await fetch(`${client.url}api/tickets/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Ticket>(response, "ticket");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createTicket(
  client: ApiClient,
  eventId: string
): Promise<ClientResponse<Ticket | Message>> {
  try {
    const response = await fetch(`${client.url}api/tickets/${eventId}`, {
      method: "POST",
      headers: client.headers,
    });
    const body = await detachBody<Ticket>(response, "ticket");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deleteTicket(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/tickets/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
