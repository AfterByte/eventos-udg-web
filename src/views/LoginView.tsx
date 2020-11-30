import React from "react";
// Custom components
import Login from "../components/forms/LoginForm";
import SideBar from "../components/SideBar";
// Assets
import Fondo from "../assets/images/fondo.jpg";

const LoginView = () => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50">
        <div
          className="col-span-6 h-full flex flex-col"
          style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover" }}
        >
          <Login />
        </div>
      </div>
    </div>
  );
};
export default LoginView;
