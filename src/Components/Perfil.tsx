import React, { Component, useState, useContext } from "react";
import UserIcon from "../assets/icons/user-solid-circle.svg";
import { AuthContext, AuthProviderPayload } from "./AuthProvider";

interface PerfilProps {
  userName: string;
}

interface PerfilState {
  isOpen: boolean;
}

const Perfil = ({userName}: PerfilProps )=>{
  
  const[isOpen,setIsOpen]=useState(false);

  const handleClick=()=>{
    setIsOpen(!isOpen);
  }

  const {signout}=useContext(AuthContext) as AuthProviderPayload;

  return (
    <div className="relative w-full">
      <button
        onClick={() => handleClick()}
        className="grid grid-cols-3 items-center w-full"
      >
        <div className="col-span-2">
          <p className="hidden md:grid font-normal text-lg">
            Hola {userName}
          </p>
        </div>
        <div className="col-span-3 sm:mr-0 md:col-span-1 flex justify-center">
          <img className="h-12" src={UserIcon} alt={"UserIcon"} />
        </div>
      </button>
      {isOpen ? (
        <div className="grid grid-cols-1 absolute w-full text-center bg-white border mt-5 z-10">
          {/* TODO: Add the correct href to route */}
          <a
            className="border block px-2 py-2 hover:bg-indigo-500 hover:text-white"
            href="#"
          >
            Editar perfil
          </a>
          <button
            onClick={signout}
            className="border block px-2 py-2 hover:bg-red-500 hover:text-white text-red-500 font-medium"
            
          >
            Cerrar sesion
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}; export default Perfil;

