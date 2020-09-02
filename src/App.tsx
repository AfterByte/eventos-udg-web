import React from "react";
import "./assets/main.css";
// Components imports
import Routes from "./Components/Routes";
import AuthProvider from "./Components/AuthProvider";


const App = () => {
  return (
    
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
};
export default App;
