type Headers = {
  Accept?: string;
  "Content-type"?: string;
  Authorization?: string;
};

const appendToken = (headers: Headers, token: string) =>
  ({
    ...headers,
    Authorization: `Bearer ${token}`,
  } as Headers);

const deatachToken = (response: Response) => {
  const bearer = response.headers.get("Authorization");
  if (bearer) {
    return bearer.split("")[1];
  } else {
    return "";
  }
};
// Payload types
export type UserCredentials = { code: number; password: string };
export type ClientResponse = { body: any; status: number };

export default class EventosudgApiClient {
  private token: string;
  private endpointUrl: string;
  private headers: Headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };

  constructor(endpointUrl: string) {
    this.token = "";
    this.endpointUrl = endpointUrl;
  }

  get url() {
    const myUrl = this.endpointUrl.split("");
    myUrl.pop();
    return myUrl.join("");
  }

  get tokenLoaded() {
    return this.token ? true : false;
  }

  async testConnection() {
    const response = await fetch(`${this.endpointUrl}`, {
      method: "GET",
      headers: this.headers as any,
    });
    const json = await response.json();
    return { body: json, status: response.status } as ClientResponse;
  }

  async refreshToken() {
    // Check if a token is in memory, otherwise search in storage
    if (!this.token) this.token = localStorage.getItem("pipo") || "";
    if (this.token) {
      // If a token was found refresh it
      const response = await fetch(`${this.endpointUrl}api/auth`, {
        method: "GET",
        headers: appendToken(this.headers, this.token) as any,
      });
      // If the token is refreshed successfully save it in storage
      // Otherwise the server would respond 401 if the token is no longer valid
      if (response.status < 300) {
        this.token = deatachToken(response);
        localStorage.setItem("pipo", this.token);
      }
      const json = await response.json();
      return { body: json, status: response.status } as ClientResponse;
    }

    return { status: 401, body: {} };
  }

  // user params: email, password
  async signIn(user: UserCredentials) {
    const response = await fetch(`${this.endpointUrl}api/auth`, {
      method: "POST",
      headers: this.headers as any,
      body: JSON.stringify(user),
    });
    // If the users signs in successfully save token in storage
    // Otherwise the server would repond 401 if the token is no longer valid
    if (response.status < 300) {
      this.token = deatachToken(response);
      localStorage.setItem("pipo", this.token);
    }
    const json = await response.json();
    return { body: json, status: response.status } as ClientResponse;
  }

  async signOut() {
    const response = await fetch(`${this.endpointUrl}api/auth`, {
      method: "DELETE",
      headers: appendToken(this.headers, this.token) as any,
    });
    // Remove token from storage and memory on successful sign out
    let json: object = {};
    if (response.body) json = await response.json();
    const result = { body: json, status: response.status };
    if (response.status < 300) {
      this.token = "";
      localStorage.removeItem("pipo");
    }

    return result as ClientResponse;
  }
}
