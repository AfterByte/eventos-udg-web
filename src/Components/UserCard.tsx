import React from "react";
//import types
import { User } from "../helpers/payloads"

interface UserCardprops{
  user: User;
  onClick: any
}

export default function UserCard(props:UserCardprops) {
  return (
    <button onClick={(e) => props.onClick(props.user.id)} className="col-span-1 mr-4 h-32 bg-white ml-4 shadow-md text-left hover:bg-indigo-500 hover:bg-opacity-50 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
      <div className="pl-4">
        <p className="font-medium text-xl sm:text-2xl">Usuario</p>
        <p className="font-base text-md sm:text-xl">{props.user.person.name} {props.user.person.lastname} {props.user.person.second_lastname}</p>
      </div>
    </button>
  );
}
