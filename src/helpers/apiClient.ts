type Headers = {
  Accept: string;
  "Content-type": string;
};

const appendToken = (headers: Headers, token: string) => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});
const deatachToken = (response: Response) => {
  const bearer = response.headers.get("authorization");
  if (bearer) {
    return bearer.split("")[1];
  } else {
    return "";
  }
};

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
      headers: this.headers,
    });
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise((resolve) => resolve(result));
  }

  async refreshToken() {
    // Check if a token is in memory, otherwise search in storage
    if (!this.token)
      if (this.token) {
        // TODO: Get token from local storage

        // If a token was found refresh it
        const response = await fetch(`${this.endpointUrl}api/auth`, {
          method: "GET",
          headers: appendToken(this.headers, this.token),
        });
        // If the token is refreshed successfully save it in storage
        // Otherwise the server would respond 401 if the token is no longer valid
        if (response.status < 300) {
          this.token = deatachToken(response);
          // TODO: Save token in local storage
        }
        const json = await response.json();
        const result = { body: json, status: response.status };

        return new Promise((resolve) => resolve(result));
      }

    return new Promise((resolve) => resolve({ status: 401, body: {} }));
  }

  // user params: email, password
  async signIn(user: { code: number; password: "string" }) {
    const response = await fetch(`${this.endpointUrl}api/auth`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    });
    // If the users signs in successfully save token in storage
    // Otherwise the server would repond 401 if the token is no longer valid
    if (response.status < 300) {
      this.token = deatachToken(response);
      // TODO: Save token in local storage
    }
    const json = await response.json();
    const result = { body: json, status: response.status };

    return new Promise((resolve) => resolve(result));
  }

  async signOut() {
    const response = await fetch(`${this.endpointUrl}api/auth`, {
      method: "DELETE",
      headers: appendToken(this.headers, this.token),
    });
    // Remove token from storage and memory on successful sign out
    let json: object = {};
    if (response.body) json = await response.json();
    const result = { body: json, status: response.status };
    if (response.status < 300) {
      this.token = "";
      // TODO: Remove Token from local storage
    }

    return new Promise((resolve) => resolve(result));
  }
}
