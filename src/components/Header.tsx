import React, { useContext } from "react";
import Perfil from "./Perfil";
import { ResponsiveContext, RespContextPayload } from "./Routes";
// Assets
import NotificationIcon from "../assets/icons/notifications.svg";
import Menu from "../assets/icons/menu.svg";

interface HeaderProps {
  barTitle: string;
}

const Header = ({ barTitle }: HeaderProps) => {
  const { toggleSidebar } = useContext(ResponsiveContext) as RespContextPayload;

  return (
    <div className="relative flex flex-row justify-center items-center py-2 md:py-5 bg-white">
      <div className="ml-4">
        <button className="lg:hidden mr-auto" onClick={toggleSidebar}>
          <img id="sideBarShow" className="h-8" src={Menu} alt={"MenuIcon"} />
        </button>
      </div>
      <h1 className="text-2xl absolute">{barTitle}</h1>
      <div className="flex flex-row mr-4 ml-auto">
        <button>
          <img
            className="h-6 hidden"
            src={NotificationIcon}
            alt={"NotificationIcon"}
          />
        </button>
        <Perfil />
      </div>
    </div>
  );
};
export default Header;
