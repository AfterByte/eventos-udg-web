import { parse } from "path";
import { Person } from "./payloads";

export const typeOf = <T>(
  discriminatorKey: string,
  object: any
): object is T => {
  return discriminatorKey in object;
};

export const parseName = (person?: Person) => {
  if (!person) return "";
  else if (person.lastname) return person.name;
  else {
    const name = person.name.split(" ").pop() || "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};

export const parseFullName = (person?: Person) => {
  if (!person) return "";
  else if (person.lastname)
    return `${person.lastname} ${person.second_lastname} ${person.name} `;
  return person.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

export const dateToIso = (d?: Date | string) => {
  if (!d) return "";
  if (typeof d === "string") d = new Date(d);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
};

export const getDateHour = (date?: Date | string) => {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);

  const fixNumFormat = (n: number) => (n > 10 ? `${n}` : `0${n}`);

  return `${fixNumFormat(date.getHours())}:${fixNumFormat(date.getMinutes())}`;
};

export const toDateTime = (date: string | Date, hour: string) => {
  const d = dateToIso(date);

  return new Date(d + hour);
};

export const formatStrTag = (tag: string) => {
  const split = tag.split(" ");
  if (split.length > 0) tag = split.join("");
  if (tag.charAt(0) === "#") tag = tag.slice(1);

  return tag;
};
