import React, { useContext } from "react";
import NotificationIcon from "../assets/icons/notifications.svg";
import Perfil from "../Components/Perfil";
import Menu from "../assets/icons/menu.svg";
import { ResponsiveContext, RespContextPayload } from "./Routes";
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
import { Person } from "../helpers/payloads";

interface HeaderProps {
  barTitle: string;
}

const parseName = (person?: Person) => {
  if (!person) return "";
  else if (person.lastname) return person.name;
  else {
    const name = person.name.split(" ").pop() || "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};

const Header = ({ barTitle }: HeaderProps) => {
  const { toggleSidebar } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const userName = parseName(apiClient.user?.person);

  return (
    <div className="col-start-2 col-end-7 grid xl:grid-cols-2 md:grid-cols-2 grid-cols-2 shadow-md text-center md:w-auto max-h-auto items-center py-2 sm:py-5 bg-white">
      <div className="text-center font-medium text-2xl md:text-right flex justify-between">
        <button onClick={toggleSidebar}>
          <img
            id="sideBarShow"
            className="h-8 ml-2 sm:hidden"
            src={Menu}
            alt={"MenuIcon"}
          />
        </button>
        <p>{barTitle}</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 items-center">
        <div className="col-span-1 sm:col-span-3 xl:mr-2 flex justify-end">
          <button>
            <img
              className="h-6"
              src={NotificationIcon}
              alt={"NotificationIcon"}
            />
          </button>
        </div>
        <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-end">
          <Perfil userName={userName} />
        </div>
      </div>
    </div>
  );
};
export default Header;
