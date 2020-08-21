import React, { Component } from "react";
import UserIcon from "../assets/icons/user-solid-circle.svg";

interface props {
  userName: string;
}

interface dropdownValues {
  isOpen: boolean;
}

export default class Perfil extends Component<props, dropdownValues> {
  state: dropdownValues = {
    isOpen: false,
  };

  handleClick() {
    this.setState((state) => ({
      isOpen: !this.state.isOpen,
    }));
  }

  render() {
    return (
      <div className="relative w-full">
        <button
          onClick={() => this.handleClick()}
          className="grid grid-cols-3 items-center w-full"
        >
          <div className="col-span-2">
            <p className="hidden md:grid font-normal text-lg">
              Hola {this.props.userName}
            </p>
          </div>
          <div className="col-span-3 sm:mr-0 md:col-span-1 flex justify-center">
            <img className="h-12" src={UserIcon} alt={"UserIcon"} />
          </div>
        </button>
        {this.state.isOpen ? (
          <div className="grid grid-cols-1 absolute w-full text-center bg-white border mt-5 z-10">
            {/* TODO: Add the correct href to route */}
            <a
              className="border block px-2 py-2 hover:bg-indigo-500 hover:text-white"
              href="#"
            >
              Editar perfil
            </a>
            <a
              className="border block px-2 py-2 hover:bg-red-500 hover:text-white text-red-500 font-medium"
              href="#"
            >
              Cerrar sesion
            </a>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
