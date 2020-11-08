import ApiClient, { detachBody, detachToken } from ".";
import { ClientResponse } from ".";
import { Message, User, UserCredentials } from "../payloads";
import { typeOf } from "../validationFunctions";

export async function refreshToken(
  client: ApiClient
): Promise<ClientResponse<Message>> {
  // Check if a token is in memory, otherwise search in storage
  if (!client.token) client.token = localStorage.getItem("pipo") || "";
  if (!client.user) {
    const userStr = localStorage.getItem("user");
    if (userStr) client.user = JSON.parse(userStr);
  }
  if (client.token) {
    try {
      // If a token was found refresh it
      const response = await fetch(`${client.url}api/auth`, {
        method: "GET",
        headers: client.headers,
      });
      // If the token is refreshed successfully save it in storage
      // Otherwise the server would respond 401 if the token is no longer valid
      if (response.status < 300) {
        client.token = detachToken(response);
        localStorage.setItem("pipo", client.token);
      }
      const body = await detachBody(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  return { status: 401 };
}

// user params: email, password
export async function signIn(
  client: ApiClient,
  user: UserCredentials
): Promise<ClientResponse<User | Message>> {
  let response: Response;
  try {
    response = await fetch(`${client.url}api/auth`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw new Error("There was a problem while fetching the remote source!");
  }
  const body = await detachBody<User>(response, "user");
  // If the users signs in successfully save token in storage
  // Otherwise the server would repond 401 if the token is no longer valid
  if (response.status < 300) {
    client.token = detachToken(response);
    localStorage.setItem("pipo", client.token);
    if (typeOf<User>("id", body)) {
      localStorage.setItem("user", JSON.stringify(body));
      client.user = body;
    }
  }
  return { body, status: response.status };
}

export async function signOut(
  client: ApiClient
): Promise<ClientResponse<Message>> {
  let response: Response;
  try {
    response = await fetch(`${client.url}api/auth`, {
      method: "DELETE",
      headers: client.headers,
    });
  } catch (error) {
    throw new Error("Therre was a problem while fetching the remote source!");
  }
  // Remove info from storage and memory
  client.token = "";
  localStorage.removeItem("pipo");
  localStorage.removeItem("user");

  const body = await detachBody(response);
  return { body, status: response.status };
}
