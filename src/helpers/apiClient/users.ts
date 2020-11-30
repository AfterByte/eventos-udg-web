import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Message, User } from "../payloads";

export async function indexUsers(
  client: ApiClient
): Promise<ClientResponse<{ users: User[] } | Message>> {
  try {
    const response = await fetch(`${client.url}api/users`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{
      users: User[];
    }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function getUser(
  client: ApiClient,
  id: string
): Promise<ClientResponse<User | Message>> {
  try {
    const response = await fetch(`${client.url}api/users/${id}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<User>(response, "user");
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}

export async function updateUserRole(
  client: ApiClient,
  id: string,
  role: string
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}api/users/${id}/role`, {
      method: "PUT",
      headers: client.headers,
      body: JSON.stringify({ role }),
    });
    const body = await detachBody(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
