import React from "react";
import { Link } from "react-router-dom";
/**ICONS IMPORTS */
import Event from "../assets/icons/event.svg";
import myEvents from "../assets/icons/myEvents.svg";
import createEvent from "../assets/icons/createEvent.svg";
import ticket from "../assets/icons/ticket.svg";
import nextEvent from "../assets/icons/nextEvent.svg";
import location from "..//assets/icons/location.svg";
import udgSvg from "../Images/udgL.png";

/**Menu component
 * Redirect to the corresponding sections of each button
 * this component works for all components with side bar
 */
const Menu = () => {
  return (
    <div className="">
      <ul className="w-full">
        <li className="border-b-2 m-8 text-center">
          <div className="flex">
            <img className="w-16 pb-3 " src={udgSvg} alt={"SortIcon"} />
            <h1 className="mt-4 text-3xl font-bold text-center text-white font-sans ">
              Eventos UDG
            </h1>
          </div>
        </li>

        <li className="flex text-white mt-8 m-8 pl-12 font-sans text-center">
          <img
            src={Event}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0">
            <Link to="/events">Proximos eventos</Link>
          </button>
        </li>

        <li className="border-b-2 m-8">
          <h1 className="mt-8 text-x font-semibold text-left text-white font-sans ">
            Organizar eventos
          </h1>
        </li>

        <li className="flex text-white text-center font-sans mt-4 m-8 pl-12">
          <img
            src={createEvent}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0 ml-6">
            <Link to="/createEvent">Crear eventos</Link>
          </button>
        </li>

        <li className="flex text-white font-sans text-center m-8 mt-4 pl-12">
          <img
            src={myEvents}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0 ml-6">
            Mis eventos
          </button>
        </li>

        <li className="border-b-2 m-8 ">
          <h1 className="mt-8 text-left font-semibold text-white font-sans ">
            Mis entradas
          </h1>
        </li>

        <li className="flex text-white font-sans text-center mt-4 m-8 pl-12">
          <img
            src={ticket}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0 ml-6">
            <Link to="/myTickets"> Entradas </Link>
          </button>
        </li>

        <li className="border-b-2 border-white m-8">
          <h1 className="mt-8 text-x font-semibold text-left text-white font-sans  ">
            Opciones de administrador
          </h1>
        </li>

        <li className="flex text-white font-sans text-center m-8 mt-4 pl-12">
          <img
            src={nextEvent}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0">
            Ver todos los eventos
          </button>
        </li>
        <li className="flex text-white font-sans text-center m-8 mt-4 pl-12">
          <img src={location} alt={"SortIcon"} />

          <button className="border border-transparent rounded hover:bg-blue-500 bg-opacity-0">
            <Link to="/locations">Ubicaciones</Link>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
