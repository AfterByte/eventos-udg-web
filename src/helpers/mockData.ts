import { Event, Location } from "./payloads";

export const events = [
  {
    id: 0,
    name: "Evento 0",
    capacity: 20,
    description: "an Empty event",
    organizer: "Dios",
    status: "Disponible",
    date: "17/Ago/2020 09:30am",
    maxCapacity: 31,
  },
  {
    id: 1,
    name: "Evento 1",
    capacity: 20,
    description: "an Empty event",
    organizer: "Dios",
    status: "Disponible",
    date: "17/Ago/2020 09:30am",
    maxCapacity: 31,
  },
  {
    id: 2,
    name: "Evento 2",
    capacity: 20,
    description: "an Empty event",
    organizer: "Dios",
    status: "Disponible",
    date: "17/Ago/2020 09:30am",
    maxCapacity: 31,
  },
  {
    id: 2,
    name: "Evento 2",
    capacity: 20,
    description: "an Empty event",
    organizer: "Dios",
    status: "Disponible",
    date: "17/Ago/2020 09:30am",
    maxCapacity: 31,
  },
  {
    id: 2,
    name: "Evento 2",
    capacity: 20,
    description: "an Empty event",
    organizer: "Dios",
    status: "Disponible",
    date: "17/Ago/2020 09:30am",
    maxCapacity: 31,
  },
];

export const locations = [
  {
    id: 0,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 1,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: true,
    isEnabled: false,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 2,
    name: "Location 3",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva"},
    capacity: 90,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 3,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 4,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 5,
    name: "Location 3",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 6,
    name: "CUSur: Auditorio Gonzáles Ochoa",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 7,
    name: "CUSur: Auditorio Gonzáles Ochoa 2",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
  {
    id: 8,
    name: "Location 3",
    location: {city:"Ciudad Guzmán", state:"Jalisco", address:"Av. Enrique Arreola Silva #833, Col. Centro"},
    capacity: 160,
    isAllowed: false,
    isEnabled: true,
    lat: 19.725539,
    lng: -103.461508,
    organizers: ["CUSur","tecnologico de Piedras Negras", "El cachas"]
  },
];

export const campuses = [
  {
    id:0,
    name: "Centro Universitario del Sur",
    campus: "Campus Cd. Guzmán",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cntraveler.com%2Fphotos%2F56953c34e17ca74e420e0a3b%2Fmaster%2Fw_1024%2Cc_limit%2FGettyImages-University-of-Chicago-Matt-Frankel-correced.jpg&f=1&nofb=1"
  },
  {
    id:1,
    name: "Centro Universitario de Consti",
    campus: "Campus America",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZIHzdcm03BPIJIHJAujcpgHaED%26pid%3DApi&f=1"
  },
  {
    id:2,
    name: "Centro Universitario de Piedras negras",
    campus: "Campus Melaque",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblogs.ubc.ca%2Fallisonlee%2Ffiles%2F2013%2F10%2FTop-10-Universities-in-USA.jpg&f=1&nofb=1"
  },
  {
    id:3,
    name: "Centro Universitario de las Pecas",
    campus: "Campus Puerto Vallarta",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thoughtco.com%2Fthmb%2FP2VM2iEskutbaPxd7L1Hbk104-0%3D%2F1600x1067%2Ffilters%3Afill(auto%2C1)%2FPatrick-Nouhailler-Introduction-Princeton-56a188903df78cf7726bceef.jpg&f=1&nofb=1"
  }
]

const location:Location={
  city:"lomasturbas",
  address:"colonia consti",
  id:"20",
  disabled:false,
  latitude: 19.725539,
  longitude: -103.461508,
  max_capacity:300,
  name:"Casa del arte",
  third_party: true
  
}
export const eventsTickets:Event[]=[
  {
    id: "1",
    name: "Marcha en contra del acoso",
    capacity: 20,
    enrolled: true,
    description: "an Empty event",
    organizer: {id:"12",second_lastname:"del rio",lastname:"santana",name:"arturo"},
    status: {id:"15",name:"activo"},
    guests:[],
    tags:[],
    reservation:{location,end:new Date(),start:new Date()},
  },{
    id: "2",
    name: "Marcha en contra del clasismo en lol",
    capacity: 20,
    enrolled: true,
    description: "an Empty event",
    organizer: {id:"12",second_lastname:"del rio",lastname:"santana",name:"arturo"},
    status: {id:"15",name:"activo"},
    guests:[],
    tags:[],
    reservation:{location,end:new Date(),start:new Date()},
  },{
    id: "3",
    name: "Evento como prueba secundaria",
    capacity: 100,
    enrolled: true,
    description: "Un evento interesante",
    organizer: {id:"15",second_lastname:"antionio",lastname:"becerra",name:"Serch"},
    status: {id:"50", name:"activo"},
    guests:[],
    tags:[],
    reservation:{location,end:new Date(),start:new Date()},
  },{
    id: "50",
    name: "Evento como prueba secundaria referente al indice de MIT",
    capacity: 100,
    enrolled: true,
    description: "Un evento interesante",
    organizer: {id:"15",second_lastname:"antionio",lastname:"becerra",name:"Serch"},
    status: {id:"50", name:"activo"},
    guests:[],
    tags:[],
    reservation:{location,end:new Date(),start:new Date()},
  },
]

export const itemsObject=[
  {
    id:"0",
    name: "sillas gamer",
    countable: true,
  }
]