import ApiClient, { detachBody } from ".";
import { ClientResponse } from ".";
import { Attachment } from "../payloads";

export async function getImage(
  client: ApiClient,
  attachment: Attachment | string
): Promise<ClientResponse<{ url: string }>> {
  let id = "";
  if (typeof attachment === "string") id = attachment;
  else id = attachment.id;

  try {
    const headers = client.headers;
    delete headers["Accept"];
    const response = await fetch(`${client.url}api/attachments/${id}`, {
      method: "GET",
      headers,
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return { status: response.status, body: { url } };
    } else return { status: response.status };
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
}
