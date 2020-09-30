export type Payload<T> = Pick<T, Exclude<keyof T, "id">>;

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export type Message = {
  message: string;
};

export type UserCredentials = {
  code: number;
  password: string;
};

export type Attachment = {
  id: string;
  file_path: string;
};

export type User = {
  name: string;
  lastname: string;
  secondlastname: string;
  image?: Attachment;
};

export type Event = {
  id: string;
  name: string;
  capacity: number;
  description: string;
  organizer: string;
  status: string;
  date: string;
  maxCapacity: number;
  image?: Attachment;
};

export type Campus = {
  id: string;
  name: string;
  city: string;
  image?: Attachment;
};

export type Location = {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  city: string;
  address: string;
  max_capacity: number;
  third_party: boolean;
  disabled: boolean;
  campuses?: Campus[];
};
