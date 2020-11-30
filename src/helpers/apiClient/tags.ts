import formUrlEncoded from "form-urlencoded";
import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Message, Search, Tag } from "../payloads";

export async function indexTags(
  client: ApiClient,
  search?: Search
): Promise<ClientResponse<{ tags: Tag[] } | Message>> {
  try {
    const query = formUrlEncoded(search);
    const response = await fetch(`${client.url}api/tags?${query}`, {
      method: "GET",
      headers: client.headers,
    });
    const body = await detachBody<{ tags: Tag[] }>(response);
    return { body, status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
