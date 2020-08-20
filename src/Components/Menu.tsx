import React from "react";
import Event from '../assets/icons/event.svg';
import myEvents from '../assets/icons/myEvents.svg';
import createEvent from '../assets/icons/createEvent.svg';
import ticket from '../assets/icons/ticket.svg';
import nextEvent from '../assets/icons/nextEvent.svg';
import udgSvg from '../Images/udgL.png';
import menu from '../assets/icons/menu.svg'


function proxEvent(){
    alert("Thi is por next eventos")
}
function NewEvent(){
    alert("This is for new Events")
}
function Entry(){
  alert("mis entradas perros")
}
function myEvent(){
  alert("Mis eventos perros")
}
function allEvent(){
  alert("All events")
  
}



const Menu = (props: any) => {
  
  return (
    <div className="">
      <ul className="">
        <li className="flex underline text-xl font-medium text-center text-white font-sans ">
          <button onClick={props.changeHidden}><img id="sideBarShow" className="h-8 ml-2 sm:hidden" 
          src={menu} 
          alt={"MenuIcon"}
          style={{ filter: "invert(100%)" }}
          /></button>
          <img className="hidden sm:w-1/5 " src={udgSvg} alt={"SortIcon"} />
          Eventos UDG
          
        </li>


        <button onClick={proxEvent}>
          <li className="flex text-white mt-8 font-sans text-center">
            <img
              src={Event}
              alt={"SortIcon"}
              style={{ filter: "invert(100%)" }}
            />
            Proximos Eventos
          </li>
        </button>

        <li>
          <h1 className="underline mt-8 text-x font-medium text-left text-white font-sans ">
            Organizar eventos
          </h1>
        </li>

        <button onClick={NewEvent}>
          <li className="flex text-white text-center font-sans">
            <img
              src={createEvent}
              alt={"SortIcon"}
              style={{ filter: "invert(100%)" }}
            />
            <button onClick={NewEvent}>Crear eventos</button>
          </li>
        </button>

        <li className="flex text-white font-sans text-center">
          <img
            src={myEvents}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />
          <button onClick={myEvent}>Mis eventos</button>
        </li>

        <li>
          <h1 className="underline mt-8 text-left text-white font-sans ">
            Mis entradas
          </h1>
        </li>

        <li className="flex text-white font-sans text-center">
          <img
            src={ticket}
            alt={"SortIcon"}
            style={{ filter: "invert(100%)" }}
          />{" "}
          <button onClick={Entry}>Entradas</button>
        </li>

        <li>
          <h1 className="underline mt-8 text-x font-medium text-left text-white font-sans ">
            Opciones de administrador
          </h1>
        </li>
        <button onClick={allEvent}>
          <li className="flex text-white font-sans text-center">
            <img
              src={nextEvent}
              alt={"SortIcon"}
              style={{ filter: "invert(100%)" }}
            />
            Ver todos los eventos
          </li>
        </button>
      </ul>
    </div>
  );
};
export default Menu;
