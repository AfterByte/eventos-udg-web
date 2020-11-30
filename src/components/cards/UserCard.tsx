import React from "react";
//import types
import { User } from "../../helpers/payloads";
import { parseFullName } from "../../helpers/validationFunctions";
import { roles } from "../forms/EditUserForm";

interface UserCardprops {
  user: User;
  setShownUser(user: User): void;
}

export default function UserCard({ user, setShownUser }: UserCardprops) {
  return (
    <button
      onClick={() => {
        setShownUser(user);
      }}
      className="px-4 py-8 mb-4 w-full bg-white shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
    >
      <p className="font-medium text-xl sm:text-2xl">
        {roles.find((role) => role.value === user.role.name)?.name ||
          "Desconocido"}
      </p>
      <p className="font-base text-md sm:text-xl">
        {parseFullName(user.person)}
      </p>
    </button>
  );
}
