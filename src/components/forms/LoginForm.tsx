import React, { useState, useContext } from "react";
// Context imports
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
// Helpers
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type LoginProps = {
  className?: string;
};

const Login = ({ className }: LoginProps) => {
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
    <div
      className={`${className} inline-flex m-auto py-8 px-20 bg-white rounded-lg`}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="text-center mb-6">
          <h1 className="font-light text-5xl text-blue-800">¡Bienvenido!</h1>
          <h1 className="font-light text-xl">Inicia sesión utilizando tu</h1>
          <h1 className="font-light text-xl">cuenta de SIIAU</h1>
        </div>
        <div className="mb-4 w-4/5 mx-auto">
          <label htmlFor="matricula" className="font-light text-xl block mb-2">
            Matricula
          </label>
          <input
            type="text"
            name="Code"
            onChange={(event) => setCode(event.target.value)}
            value={code}
            id="matricula"
            placeholder="Matrícula"
            className="inputCode appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded"
          />
        </div>
        <div className="mb-4 w-4/5 mx-auto">
          <label htmlFor="nip" className="font-light text-xl block mb-2">
            NIP
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="Nip"
            id="nip"
            placeholder="Contraseña"
            className="inputNip appearance-none bg-white border border-grey-light hover:border-grey p-2 w-full rounded"
          />
        </div>
        <div className="text-center">
          <button className="text-center bg-teal-500 text-white hover:bg-teal-900 font-bold py-2 px-4 mt-8 rounded">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
