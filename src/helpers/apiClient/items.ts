import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Message, Optional, Payload, Item } from "../payloads";

export async function indexItems(
  client: ApiClient
): Promise<ClientResponse<{ items: Item[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/items`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{
      items: Item[];
    }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getItem(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Item | Message>> {
  try {
    const response = await fetch(`${client.url}api/items/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Item>(response, "item");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function createItem(
  client: ApiClient,
  item: Payload<Item>
): Promise<ClientResponse<Item | Message>> {
  try {
    const response = await fetch(`${client.url}api/items`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(item),
    });
    const body = await detachBody<Item>(response, "item");
    return { body, status: response.status };
  } catch (error) {
    console.error(error);
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateItem(
  client: ApiClient,
  id: string,
  item: Optional<Payload<Item>>
): Promise<ClientResponse<Item | Message>> {
  try {
    const response = await fetch(`${client.url}api/items/${id}`, {
      method: "PATCH",
      headers: client.headers,
      body: JSON.stringify(item),
    });
    const body = await detachBody<Item>(response, "item");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function deleteItem(
  client: ApiClient,
  id: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/items/${id}`, {
      method: "DELETE",
      headers: client.headers,
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
