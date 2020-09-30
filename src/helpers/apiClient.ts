import {
  Payload,
  UserCredentials,
  User,
  Message,
  Location,
  Without,
  Optional,
  Campus,
} from "./payloads";

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

const detachToken = (response: Response) => {
  const bearer = response.headers.get("Authorization");
  if (bearer) {
    return bearer.split(" ")[1];
  } else {
    return "";
  }
};

const detachBody = async <T = any>(response: Response, innerKey?: string) => {
  try {
    const json = await response.json();
    if (response.status < 300) {
      if (innerKey) {
        if (innerKey in json) return json[innerKey] as T;
        else
          throw new Error(
            "The given key does not exist in the received object!"
          );
      } else return json as T;
    } else return json as Message;
  } catch (error) {
    // console.warn("The body is propably empty or maybe it is not JSON");
  }
};

// Api client response type
export type ClientResponse<T = any> = { body?: T; status: number };

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

  async testConnection(): Promise<ClientResponse<Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}`, {
        method: "GET",
        headers: this.headers as any,
      });
      const body = await detachBody<Message>(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error(
        "There was a problem while fetching the remote resource!"
      );
    }
  }

  async refreshToken(): Promise<ClientResponse<Message>> {
    // Check if a token is in memory, otherwise search in storage
    if (!this.token) this.token = localStorage.getItem("pipo") || "";
    if (this.token) {
      try {
        // If a token was found refresh it
        const response = await fetch(`${this.endpointUrl}api/auth`, {
          method: "GET",
          headers: appendToken(this.headers, this.token) as any,
        });
        // If the token is refreshed successfully save it in storage
        // Otherwise the server would respond 401 if the token is no longer valid
        if (response.status < 300) {
          this.token = detachToken(response);
          localStorage.setItem("pipo", this.token);
        }
        const body = await detachBody(response);
        return { body, status: response.status };
      } catch (error) {
        throw new Error(
          "There was a problem while fetching the remote source!"
        );
      }
    }

    return { status: 401 };
  }

  // user params: email, password
  async signIn(user: UserCredentials): Promise<ClientResponse<User | Message>> {
    let response: Response;
    try {
      response = await fetch(`${this.endpointUrl}api/auth`, {
        method: "POST",
        headers: this.headers as any,
        body: JSON.stringify(user),
      });
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
    // If the users signs in successfully save token in storage
    // Otherwise the server would repond 401 if the token is no longer valid
    if (response.status < 300) {
      this.token = detachToken(response);
      localStorage.setItem("pipo", this.token);
    }
    const body = await detachBody<User>(response, "user");
    return { body, status: response.status };
  }

  async signOut(): Promise<ClientResponse<Message>> {
    let response: Response;
    try {
      response = await fetch(`${this.endpointUrl}api/auth`, {
        method: "DELETE",
        headers: appendToken(this.headers, this.token) as any,
      });
    } catch (error) {
      throw new Error("Therre was a problem while fetching the remote source!");
    }
    // Remove token from storage and memory on successful sign out
    if (response.status < 300) {
      this.token = "";
      localStorage.removeItem("pipo");
    }

    const body = await detachBody(response);
    return { body, status: response.status };
  }

  /* Locations requests */

  async indexLocations(): Promise<
    ClientResponse<{ locations: Without<Location, "campuses">[] } | Message>
  > {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations`, {
        method: "GET",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody<{
        locations: Without<Location, "campuses">[];
      }>(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async getLocation(id: string): Promise<ClientResponse<Location | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations/${id}`, {
        method: "GET",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody<Location>(response, "location");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async createLocation(
    location: Payload<Without<Location, "campuses">>
  ): Promise<ClientResponse<Location | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations`, {
        method: "POST",
        headers: appendToken(this.headers, this.token) as any,
        body: JSON.stringify(location),
      });
      const body = await detachBody<Location>(response, "location");
      return { body, status: response.status };
    } catch (error) {
      console.error(error);
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async updateLocation(
    id: string,
    location: Optional<Payload<Without<Location, "campuses">>>
  ): Promise<ClientResponse<Location | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations/${id}`, {
        method: "PATCH",
        headers: appendToken(this.headers, this.token) as any,
        body: JSON.stringify(location),
      });
      const body = await detachBody<Location>(response, "location");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async deleteLocation(id: string): Promise<ClientResponse<Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations/${id}`, {
        method: "DELETE",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async addCampusesToLocation(
    id: string,
    campuses: string[]
  ): Promise<ClientResponse<Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/locations/${id}`, {
        method: "PUT",
        headers: appendToken(this.headers, this.token) as any,
        body: JSON.stringify({ campuses }),
      });
      const body = await detachBody(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  /* Campuses requests */
  async indexCampuses(): Promise<
    ClientResponse<{ campuses: Campus[] } | Message>
  > {
    try {
      const response = await fetch(`${this.endpointUrl}api/campuses`, {
        method: "GET",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody<{ campuses: Campus[] }>(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async getCampus(id: string): Promise<ClientResponse<Campus | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/campuses/${id}`, {
        method: "GET",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody<Campus>(response, "campus");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async createCampus(
    location: Payload<Campus>
  ): Promise<ClientResponse<Campus | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/campuses`, {
        method: "POST",
        headers: {
          ...(appendToken(this.headers, this.token) as any),
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify(location),
      });
      const body = await detachBody<Campus>(response, "campus");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async updateCampus(
    id: string,
    location: Optional<Payload<Campus>>
  ): Promise<ClientResponse<Campus | Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/campuses/${id}`, {
        method: "PATCH",
        headers: {
          ...(appendToken(this.headers, this.token) as any),
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify(location),
      });
      const body = await detachBody<Location>(response, "campus");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async deleteCampus(id: string): Promise<ClientResponse<Message>> {
    try {
      const response = await fetch(`${this.endpointUrl}api/campuses/${id}`, {
        method: "DELETE",
        headers: appendToken(this.headers, this.token) as any,
      });
      const body = await detachBody(response);
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }

  async getCampusLocations(
    id: string
  ): Promise<
    ClientResponse<{ locations: Without<Location, "campuses">[] } | Message>
  > {
    try {
      const response = await fetch(
        `${this.endpointUrl}api/campuses/${id}/locations`,
        {
          method: "GET",
          headers: appendToken(this.headers, this.token) as any,
        }
      );
      const body = await detachBody<{
        locations: Without<Location, "campuses">[];
      }>(response, "locations");
      return { body, status: response.status };
    } catch (error) {
      throw new Error("There was a problem while fetching the remote source!");
    }
  }
}
