import React, { Component, useState, createContext } from 'react';
import './assets/main.css'
import LoginView from './Views/LoginView'
import UpcomingEvents from './Views/UpcomingEvents'
import EventosudgApiClient from './helpers/apiClient';

const App = () => {
  const client = new EventosudgApiClient('http://167.172.196.165/');
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("USER");
  const [barTitle, setBarTitle] = useState("Proximos Eventos")
  const [events, setEvents] = useState([
                                        {"id" : 0, "name": "Evento 0", "capacity": 20, "description": "an Empty event", "organizer": "Dios", "status": "Disponible", "date": "17/Ago/2020 09:30am", "maxCapacity": 31},
                                        {"id" : 1, "name": "Evento 1", "capacity": 20, "description": "an Empty event", "organizer": "Dios", "status": "Disponible", "date": "17/Ago/2020 09:30am", "maxCapacity": 31},
                                        {"id" : 2, "name": "Evento 2", "capacity": 20, "description": "an Empty event", "organizer": "Dios", "status": "Disponible", "date": "17/Ago/2020 09:30am", "maxCapacity": 31},
                                        {"id" : 2, "name": "Evento 2", "capacity": 20, "description": "an Empty event", "organizer": "Dios", "status": "Disponible", "date": "17/Ago/2020 09:30am", "maxCapacity": 31},
                                        {"id" : 2, "name": "Evento 2", "capacity": 20, "description": "an Empty event", "organizer": "Dios", "status": "Disponible", "date": "17/Ago/2020 09:30am", "maxCapacity": 31}
                                      ]);

  return (
    <div className="">
      {false ? <div>
        <LoginView/>
      </div>
      :
      <div>
        <UpcomingEvents userName={userName} barTitle={barTitle} events={events}/>
      </div>}
    </div>
    
  )

}; export default App;
