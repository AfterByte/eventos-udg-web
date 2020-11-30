import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/**IMPORT FORMIK */
import { Field, Form } from "formik";
import "react-app-polyfill/ie11";
/**IMPORT SVG
 */
import Ask from "../../assets/icons/ask.svg";

const LocationFields = ({
  address,
  setFieldValue,
}: {
  address: string;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
}) => {
  useMemo(() => {
    setFieldValue("address", address);
  }, [setFieldValue, address]);

  return (
    <Form>
      <label
        htmlFor="name"
        className="font-sans font-thin text-grey-darker text-lg block mb-2"
      >
        Nombre
      </label>
      <Field
        className="appearance-none w-full h-8 bg-white border border-black hover:border-grey rounded shadow"
        type="text"
        name="name"
        id="name"
        required
      />
      <label
        htmlFor="city"
        className="font-sans font-thin mt-4 text-grey-darker text-lg block mb-2"
      >
        Localidad
      </label>
      <Field
        className="appearance-none w-full h-8 bg-white border border-black hover:border-grey rounded shadow"
        type="text"
        name="city"
        id="city"
        required
      />
      <label
        htmlFor="address"
        className="font-sans font-thin mt-4 text-grey-darker text-lg block mb-2"
      >
        Domicilio
      </label>
      <Field
        className="appearance-none w-full h-8 bg-white border border-black hover:border-grey rounded shadow"
        type="text"
        name="address"
        id="address"
        required
      />
      <label
        htmlFor="max_capacity"
        className="font-sans font-thin text-grey-darker mt-4 text-lg block mb-2"
      >
        Capacidad Maxima
      </label>
      <Field
        className="appearance-none w-full h-8 bg-white border border-black hover:border-grey rounded shadow"
        type="text"
        name="max_capacity"
        id="max_capacity"
        required
      />
      <Field
        className="mt-4"
        type="checkbox"
        name="third_party"
        id="third_party"
      />
      <label
        htmlFor="third_party"
        className="font-sans font-thin text-grey-darker mt-4 text-lg mb-2"
      >
        Esta ubicación no es administrada por UDG
      </label>
      <div className="flex">
        <img src={Ask} className="w-12" alt="" />
        <p className="text-sm font-thin">
          Ubicaciones no pertenecientes a UDG pueden agregarse en la agenda de
          Eventos de UDG pero el organizador del evento debe checar
          disponibilidad con el administrador de la ubicación.
        </p>
      </div>

      <Field
        className="mt-4 rounded"
        type="checkbox"
        name="disabled"
        id="disabled"
      />
      <label
        htmlFor="disabled"
        className="font-sans font-thin text-grey-darker mt-4 text-lg mb-2"
      >
        Deshabilitar ubicación temporalmente
      </label>
      <div className="flex">
        <img src={Ask} className="w-8" alt="" />
        <p className="text-sm font-thin">
          Deshabilitar la ubicación hace que no pueda utilizarse en ningún
          evento sin tener que eliminar el registro.
        </p>
      </div>
      <div className="flex flex-col items-center mt-16">
        <button
          type="submit"
          className="bg-teal-500 text-white w-32 h-8 rounded"
        >
          Guardar
        </button>
        <Link to="/locations">
          <button className="bg-gray-600 text-white w-24 mt-8 rounded">
            Volver
          </button>
        </Link>
      </div>
    </Form>
  );
};
export default LocationFields;
