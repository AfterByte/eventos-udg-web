import React from "react";
import "./assets/main.css";
// Components imports
import Routes from "./components/Routes";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
export default App;
