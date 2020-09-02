import React, { useContext } from "react";
import logo from "../Images/udgL.png";
import Menu from "./Menu";

import { AuthContext, AuthProviderPayload } from "./AuthProvider";
import { ResponsiveContext, RespContextPayload } from "./Routes";

/**SidebarComponent
 * This component only works as a background when the user is logged in a menu is show but if it isn't logged in
 * it shows a logo
 */
const SideBar = () => {
  /**Api client is used to manage the states in the sessions */
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const { toggleSidebar } = useContext(ResponsiveContext) as RespContextPayload;
  return (
    <div className="w-full h-screen bg-indigo-500">
      {/*When there is no token it means thath the user is no logged in */}
      {!apiClient.tokenLoaded ? (
        <div className="flex flex-col m-auto mt-48 w-3/5">
          <img src={logo} alt="" />
          <h1 className="text-center underline text-2xl font-bold text-white">
            Eventos UDG
          </h1>
        </div>
      ) : (
        <div className="flex flex-col m-auto w-full h-full">
          {/* TODO: add a button to toggle the sidebar */}
          <Menu />
        </div>
      )}
    </div>
  );
};
export default SideBar;
