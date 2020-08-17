import React, { Component, useState, createContext } from 'react';
import './assets/main.css'
import LoginView from './Views/LoginView'
import MainView from './Views/MainView'
import EventosudgApiClient from './helpers/apiClient';

import Menu from './Components/Menu';

const AuthContext = createContext({});

const App = () => {
  const client = new EventosudgApiClient('http://167.172.196.165/');
  const [signedIn, setSignedIn] = useState(false);

  // useEffect(() => {
  //   if (!signedIn)
  //     console.log('Hola');
  // });

  return (
      
    <div className="bg-teal-500">
      {true ?
      <div>
        <LoginView/>
      </div>
      :
      <div>
        <MainView/>
      </div>}
    </div>
    
  )

}; export default App;
