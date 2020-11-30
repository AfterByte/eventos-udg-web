import { Event, Location, Person } from "./payloads";

export const locations = [
  {
    id: 0,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 1,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: true,
    isEnabled: false,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 2,
    name: "Location 3",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva",
    },
    capacity: 90,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 3,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 4,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 5,
    name: "Location 3",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 6,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 7,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
  {
    id: 8,
    name: "Location 3",
    location: {
      city: "Ciudad Guzmán",
      state: "Jalisco",
      address: "Av. Enrique Arreola Silva #833, Col. Centro",
    },
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur", "tecnologico de Piedras Negras", "El cachas"],
  },
];

export const campuses = [
  {
    id: "0",
    name: "Centro Universitario del Sur",
    city: "Campus Cd. Guzmán",
    image: undefined,
  },
  {
    id: "1",
    name: "Centro Universitario de Consti",
    city: "Campus America",
    image: undefined,
  },
  {
    id: "2",
    name: "Centro Universitario de Piedras negras",
    city: "Campus Melaque",
    image: undefined,
  },
  {
    id: "3",
    name: "Centro Universitario de las Pecas",
    city: "Campus Puerto Vallarta",
    image: undefined,
  },
];

const location: Location = {
  city: "lomasturbas",
  address: "colonia consti",
  id: "20",
  disabled: false,
  latitude: 19.725539,
  longitude: -103.461508,
  max_capacity: 300,
  name: "Casa del arte",
  third_party: true,
};
export const eventsTickets: Event[] = [
  {
    id: "1",
    name: "Marcha en contra del acoso",
    capacity: 20,
    enrolled: 10,
    description: "an Empty event",
    organizer: {
      id: "12",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "2",
    name: "Marcha en contra del clasismo en lol",
    capacity: 20,
    enrolled: 10,
    description: "an Empty event",
    organizer: {
      id: "12",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "3",
    name: "Evento como prueba secundaria",
    capacity: 100,
    enrolled: 10,
    description: "Un evento interesante",
    organizer: {
      id: "15",
      second_lastname: "antionio",
      lastname: "becerra",
      name: "Serch",
    },
    status: { id: "50", name: "activo" },
    guests: [],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "50",
    name: "Evento como prueba secundaria referente al indice de MIT",
    capacity: 100,
    enrolled: 10,
    description: "Un evento interesante",
    organizer: {
      id: "15",
      second_lastname: "antionio",
      lastname: "becerra",
      name: "Serch",
    },
    status: { id: "50", name: "activo" },
    guests: [],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
];

export const itemsObject = [
  {
    id: "0",
    name: "sillas gamer",
    countable: true,
  },
];

export const items = [
  {
    id: 0,
    name: "Sillas",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2FP2VM2iEskutbaPxd7L1Hbk104-0%3D%2F1600x1067%2Ffilters%3Afill(auto%2C1)%2FPatrick-Nouhailler-Introduction-Princeton-56a188903df78cf7726bceef.jpg&f=1&nofb=1",
  },
  {
    id: 1,
    name: "Proyector",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2FP2VM2iEskutbaPxd7L1Hbk104-0%3D%2F1600x1067%2Ffilters%3Afill(auto%2C1)%2FPatrick-Nouhailler-Introduction-Princeton-56a188903df78cf7726bceef.jpg&f=1&nofb=1",
  },
  {
    id: 2,
    name: "Pantalla blanca",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2FP2VM2iEskutbaPxd7L1Hbk104-0%3D%2F1600x1067%2Ffilters%3Afill(auto%2C1)%2FPatrick-Nouhailler-Introduction-Princeton-56a188903df78cf7726bceef.jpg&f=1&nofb=1",
  },
  {
    id: 3,
    name: "Pantalla LED",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2FP2VM2iEskutbaPxd7L1Hbk104-0%3D%2F1600x1067%2Ffilters%3Afill(auto%2C1)%2FPatrick-Nouhailler-Introduction-Princeton-56a188903df78cf7726bceef.jpg&f=1&nofb=1",
  },
];

export const careers = [
  {
    id: "1",
    name: "Telematica",
  },
  {
    id: "2",
    name: "Izquierdo",
  },
  {
    id: "3",
    name: "Veterinaria",
  },
  {
    id: "4",
    name: "Medicina",
  },
];

export const roles = [
  {
    id: "0",
    name: "Administrador",
  },
  {
    id: "1",
    name: "NO Administrador",
  },
];

export const users = [
  {
    id: "0",
    siiau_id: "abcdeefasd",
    person: {
      id: "15",
      name: "JUAN CARLOS",
      lastname: "SANTIAGO",
      second_lastname: "CHETOS",
      image: undefined,
    },
    career: careers[0],
    campus: campuses[0],
    role: roles[1],
  },
  {
    id: "1",
    siiau_id: "abcdhefasd",
    person: {
      id: "15",
      name: "PEP",
      lastname: "SANCHEZ",
      second_lastname: "MORTY",
      image: undefined,
    },
    career: careers[1],
    campus: campuses[0],
    role: roles[0],
  },
  {
    id: "2",
    siiau_id: "abcdeefbsd",
    person: {
      id: "15",
      name: "SUMMER",
      lastname: "LOPEZ",
      second_lastname: "LOPEZ",
      image: undefined,
    },
    career: careers[2],
    campus: campuses[0],
    role: roles[1],
  },
];
export const persons: Person[] = [
  {
    id: "0",
    name: "Pep",
    lastname: "Sanchez",
    second_lastname: "Sanchez",
    image: undefined,
  },
  {
    id: "1",
    name: "Morty",
    lastname: "Sanchez",
    second_lastname: "Sanchez",
    image: undefined,
  },
];
export const events: Event[] = [
  {
    id: "0",
    name: "Marcha en contra del acoso",
    capacity: 20,
    enrolled: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus ex et enim lacinia commodo. Ut sit amet massa in eros porttitor pellentesque non vel turpis. Cras sed urna in arcu condimentum maximus. Maecenas nec metus ac libero luctus malesuada vel eu nibh. Maecenas suscipit turpis lacus, vel pulvinar turpis mollis fermentum.",
    organizer: {
      id: "15",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [persons[0]],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "1",
    name: "Marcha en contra del acoso 2: La revancha",
    capacity: 20,
    enrolled: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus ex et enim lacinia commodo. Ut sit amet massa in eros porttitor pellentesque non vel turpis. Cras sed urna in arcu condimentum maximus. Maecenas nec metus ac libero luctus malesuada vel eu nibh. Maecenas suscipit turpis lacus, vel pulvinar turpis mollis fermentum.",
    organizer: {
      id: "15",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [persons[1]],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "2",
    name: "La insurrección patriarcal",
    capacity: 20,
    enrolled: 11,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus ex et enim lacinia commodo. Ut sit amet massa in eros porttitor pellentesque non vel turpis. Cras sed urna in arcu condimentum maximus. Maecenas nec metus ac libero luctus malesuada vel eu nibh. Maecenas suscipit turpis lacus, vel pulvinar turpis mollis fermentum. ",
    organizer: {
      id: "15",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [persons[0], persons[1]],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
  {
    id: "3",
    name: "El destino genérico: El final de la saga",
    capacity: -1,
    enrolled: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus ex et enim lacinia commodo. Ut sit amet massa in eros porttitor pellentesque non vel turpis. Cras sed urna in arcu condimentum maximus. Maecenas nec metus ac libero luctus malesuada vel eu nibh. Maecenas suscipit turpis lacus, vel pulvinar turpis mollis fermentum.",
    organizer: {
      id: "15",
      second_lastname: "del rio",
      lastname: "santana",
      name: "arturo",
    },
    status: { id: "15", name: "activo" },
    guests: [persons[0], persons[1], persons[0]],
    tags: [],
    reservation: { location, end: new Date(), start: new Date() },
  },
];
