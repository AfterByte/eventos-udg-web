import React, { useContext, useEffect } from "react";
import logo from "../assets/images/udgL.png";
import Menu from "./Menu";

import { AuthContext, AuthProviderPayload } from "./AuthProvider";
import { RespContextPayload, ResponsiveContext } from "./Routes";

/**SidebarComponent
 * This component only works as a background when the user is logged in a menu is show but if it isn't logged in
 * it shows a logo
 */

const SideBar = () => {
  /**Api client is used to manage the states in the sessions */
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;

  return (
    <div
      className={`${
        sidebarHidden ? "hidden" : ""
      } flex-shrink-0 bg-indigo-500 h-full fixed z-10 lg:block lg:static overflow-auto`}
    >
      {/*When there is no token it means thath the user is no logged in */}
      {!apiClient.tokenLoaded ? (
        <div className="flex flex-col justify-center items-center h-full px-8">
          <img src={logo} alt="Logo UDG" className="w-2/3" />
          <div className="w-full pb-20">
            <h1 className="w-full pb-2 border-b-2 text-center text-4xl font-bold text-white">
              Eventos UDG
            </h1>
          </div>
        </div>
      ) : (
        <div>
          <Menu />
        </div>
      )}
    </div>
  );
};
export default SideBar;
