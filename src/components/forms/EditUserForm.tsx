import React, { useContext } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
//import styles
import "../../assets/inputs.css";
//import types
import { Payload, Role, User } from "../../helpers/payloads";
import { getUser, updateUserRole } from "../../helpers/apiClient";
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
import { typeOf } from "../../helpers/validationFunctions";

interface UserFormProps {
  changeShowForm: any;
  user?: User;
  getUsers(): void;
  setShownUser(user: User): void;
}

// Known roles
export const roles = [
  { name: "Administrador", value: "admin" },
  { name: "Privilegiado", value: "privileged" },
  { name: "Organizador", value: "organizer" },
  { name: "Usuario", value: "user" },
  { name: "Bloqueado", value: "banned" },
];

export default function EditUserForm({
  changeShowForm,
  user,
  setShownUser,
  getUsers,
}: UserFormProps) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  return (
    <div className="absolute bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <Formik
        initialValues={{
          name: user?.role.name || roles[0].value,
        }}
        onSubmit={async (
          values: Payload<Role>,
          { setSubmitting }: FormikHelpers<Payload<Role>>
        ) => {
          setSubmitting(true);

          if (user) {
            const response = await updateUserRole(
              apiClient,
              user.id,
              values.name
            );
            if (response.status < 300) {
              const rUser = await getUser(apiClient, user.id);
              if (rUser.status < 300 && typeOf<User>("id", rUser.body)) {
                setShownUser(rUser.body);
                getUsers();
                changeShowForm();
              }
            }
          }

          setSubmitting(false);
        }}
      >
        <Form className="mx-16">
          <div className="bg-white rounded m-auto p-4">
            <div className="text-center">
              <p className="text-lg font-semibold pb-2">
                Editar rol de usuario
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="name" className="pb-2">
                Seleccionar rol
              </label>
              <Field
                id="name"
                name="name"
                placeholder=""
                as="select"
                className="border border-gray-500 rounded-sm py-2 px-2"
              >
                {roles.map((r) =>
                  r.value === user?.role.name ? (
                    <option value={r.value} selected>
                      {r.name}
                    </option>
                  ) : (
                    <option value={r.value}>{r.name}</option>
                  )
                )}
              </Field>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-lg font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Guardar
              </button>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={changeShowForm}
                className="px-6 py-2 bg-gray-500 text-sm font-semibold text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Volver
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
