import { Message, User } from "../payloads";

const appendToken = (headers: Headers, token: string): any => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});

export const detachToken = (response: Response) => {
  const bearer = response.headers.get("Authorization");
  if (bearer) {
    return bearer.split(" ")[1];
  } else {
    return "";
  }
};

export const detachBody = async <T = any>(
  response: Response,
  innerKey?: string
) => {
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

// Get the key value for formdata format
const getKeyValue = (obj: any, key?: string) => {
  let result: any = {};

  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      const o = obj[i];
      if (key) result = { ...result, ...getKeyValue(o, `${key}[${i}]`) };
      else result = { ...result, ...getKeyValue(o, `${i}`) };
    }
  } else if (typeof obj === "object") {
    for (const k in obj) {
      if (typeof obj[k] === "object") {
        if (key) result = { ...result, ...getKeyValue(obj[k], `${key}[${k}]`) };
        else result = { ...result, ...getKeyValue(obj[k], k) };
      } else {
        if (key) result[`${key}[${k}]`] = `${obj[k]}`;
        else result[k] = `${obj[k]}`;
      }
    }
  } else {
    if (key) result[key] = `${obj}`;
  }

  return result;
};

export const jsonToFormdata = (json: any): FormData => {
  const data = new FormData();
  if (typeof json === "object") {
    const keyValues = getKeyValue(json);
    for (const key in keyValues) {
      data.append(key, keyValues[key]);
    }
  }

  return data;
};

// Api client response type
export type ClientResponse<T = any> = { body?: T; status: number };

export default class ApiClient {
  public token: string;
  public user?: User;
  private endpointUrl: string;
  private _headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  constructor(endpointUrl: string) {
    this.token = "";
    this.endpointUrl = endpointUrl;
  }

  get url() {
    return this.endpointUrl;
  }

  get tokenLoaded() {
    return this.token ? true : false;
  }

  get headers() {
    return appendToken(this._headers, this.token);
  }
}

export * from "./campuses";
export * from "./connectionTest";
export * from "./locations";
export * from "./sessions";
export * from "./attachments";
export * from "./events";
