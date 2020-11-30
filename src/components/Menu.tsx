import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import { RespContextPayload, ResponsiveContext } from "./Routes";
// Assets
import Event from "../assets/icons/event.svg";
import myEvents from "../assets/icons/myEvents.svg";
import createEvent from "../assets/icons/createEvent.svg";
import ticket from "../assets/icons/ticket.svg";
import nextEvent from "../assets/icons/nextEvent.svg";
import location from "../assets/icons/location.svg";
import udgSvg from "../assets/images/udgL.png";
import Clear from "../assets/icons/clear-black.svg";

/**Menu component
 * Redirect to the corresponding sections of each button
 * this component works for all components with side bar
 */
const Menu = () => {
  const { toggleSidebar, sidebarHidden } = useContext(
    ResponsiveContext
  ) as RespContextPayload;

  const closeSidebar = () => {
    if (!sidebarHidden) toggleSidebar();
  };

  return (
    <ul className="w-full">
      <button
        onClick={toggleSidebar}
        className="block lg:hidden ml-auto mt-4 mr-4"
      >
        <img
          className="h-8"
          src={Clear}
          alt={"ClearTagIcon"}
          style={{ filter: "invert(100%)" }}
        />
      </button>
      <li className="border-b-2 m-8 mt-0 lg:mt-8 text-center">
        <div className="flex">
          <img className="w-16 pb-3 " src={udgSvg} alt={"SortIcon"} />
          <h1 className="mt-4 text-3xl font-bold text-center text-white font-sans ">
            Eventos UDG
          </h1>
        </div>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/upcoming"
          onClick={closeSidebar}
        >
          <img
            className="mr-4 ml-8"
            src={Event}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <p className="text-center">Proximos eventos</p>
        </Link>
      </li>

      <li className="border-b-2 m-8">
        <h1 className="mt-8 text-x font-semibold text-left text-white font-sans ">
          Organizar eventos
        </h1>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/events/new"
          onClick={closeSidebar}
        >
          <img
            className="mr-4 ml-8"
            src={createEvent}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <p className="text-center">Crear evento</p>
        </Link>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/events/owned"
          onClick={closeSidebar}
        >
          <img
            className="mr-4 ml-8"
            src={myEvents}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <p className="text-center">Mis eventos</p>
        </Link>
      </li>

      <li className="border-b-2 m-8 ">
        <h1 className="mt-8 text-left font-semibold text-white font-sans ">
          Mis entradas
        </h1>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/tickets"
          onClick={closeSidebar}
        >
          <img
            className="mr-4 ml-8"
            src={ticket}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <p className="text-center">Entradas</p>
        </Link>
      </li>

      <li className="border-b-2 border-white m-8">
        <h1 className="mt-8 text-x font-semibold text-left text-white font-sans  ">
          Opciones de administrador
        </h1>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/events"
          onClick={closeSidebar}
        >
          <img
            className="mr-4 ml-8"
            src={nextEvent}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <p className="text-center">Todos los eventos</p>
        </Link>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/locations"
          onClick={closeSidebar}
        >
          <img className="mr-4 ml-8" src={location} alt={"SortIcon"} />
          <p className="text-center">Ubicaciones</p>
        </Link>
      </li>

      <li className="text-white m-8 font-sans">
        <Link
          className="flex rounded hover:bg-blue-500"
          to="/campuses"
          onClick={closeSidebar}
        >
          <img className="mr-4 ml-8" src={location} alt={"SortIcon"} />
          <p className="text-center">Cámpuses</p>
        </Link>
      </li>
    </ul>
  );
};
export default Menu;
