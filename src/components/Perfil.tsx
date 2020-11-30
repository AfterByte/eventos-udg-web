import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Helpers
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
import { parseName } from "../helpers/validationFunctions";
// Assets
import UserIcon from "../assets/icons/user-solid-circle.svg";

const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const userName = parseName(apiClient.user?.person);

  const { signout } = useContext(AuthContext) as AuthProviderPayload;

  const history = useHistory();

  async function closeSesion() {
    await signout();
    history.push("/");
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="flex flex-row">
        <p className="my-auto hidden md:block font-light text-xl">
          Hola {userName}
        </p>
        <img className="ml-4 h-8 md:h-10" src={UserIcon} alt={"UserIcon"} />
      </button>
      {isOpen ? (
        <div className="absolute text-center bg-white border mt-3 md:mt-5 right-0">
          <a
            className="border block px-6 py-2 hover:bg-indigo-500 hover:text-white"
            href="#"
          >
            Editar perfil
          </a>

          <button
            onClick={closeSesion}
            className="border block px-6 py-2 hover:bg-red-500 hover:text-white text-red-500 font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Perfil;
