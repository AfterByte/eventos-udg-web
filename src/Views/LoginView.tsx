import React from "react";
// Component imports
import Login from "../Components/Login";
import SideBar from "../Components/SideBar";

const LoginView = () => {
  return (
    <div className="grid grid-cols-6 h-full w-full">
      <div className="grid col-span-1 h-screen">
        <SideBar />
      </div>
      <div className="grid col-start-2 col-span-6">
        <Login />
      </div>
    </div>
  );
};
export default LoginView;
