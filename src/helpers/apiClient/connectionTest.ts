import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Message } from "../payloads";

export async function testConnection(
  client: ApiClient
): Promise<ClientResponse<Message>> {
  try {
    const response = await fetch(`${client.url}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<Message>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote resource!");
  }
}
