import React, { useState, useContext } from "react";
// Context imports
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
// Resources imports
import Fondo from "../Images/fondo.jpg";
//ALERTS
/* import alertify from "alertifyjs"; */

/**ALERTS WITH SWEETALERT */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const { signin } = useContext(AuthContext) as AuthProviderPayload;
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await signin({ code: +code, password: password });
      if (response.status >= 500) {
        // TODO: Notify user there was a server error
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en el servidor ",
          //TODO: REDIRECT TO PAGE 500
        });
        console.warn("A server error has occurred!");
      } else if (response.status === 401)
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "El codigo o la contraseña son incorrectos!",
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover" }}>
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="border-teal p-8 border-t-12 bg-white w-1/3 mb-6 mr-16 rounded-lg shadow-lg">
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="text-center">
              <h1 className="font-sans font-light text-4xl">¡Bienvenido!</h1>
              <h1 className="font-light text-xl">
                Inicia sesión utilizando tu
              </h1>
              <h1 className="font-light text-xl">cuenta de SIIAU</h1>
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="matricula"
                className="font-sans font-ligth text-grey-darker block mb-2"
              >
                Matricula
              </label>
              <input
                type="text"
                name="Code"
                onChange={(event) => setCode(event.target.value)}
                value={code}
                id="matricula"
                placeholder="INGRESA TU CODIGO"
                className="inputCode appearance-none w-1/2 bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              />
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="nip"
                className="font-sans font-ligth text-grey-darker block mb-2"
              >
                NIP
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name="Nip"
                id="nip"
                placeholder="INGRESA TU NIP"
                className="inputNip appearance-none w-1/2 bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              />
            </div>
            <div className="text-center">
              <button className="bg-teal-500 text-white hover:bg-teal-900 font-bold py-2 px-4 rounded">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
