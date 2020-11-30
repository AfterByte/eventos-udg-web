import React, { useContext, useEffect, useRef, useState } from "react";
import { getImage } from "../helpers/apiClient";
// Helpers and payloads
import { Person } from "../helpers/payloads";
import { parseFullName } from "../helpers/validationFunctions";
import { AuthContext, AuthProviderPayload } from "./AuthProvider";

type GuestProps = {
  guest: Person;
  className?: string;
};

const Guest = ({ guest, className }: GuestProps) => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [image, setImage] = useState("");
  const firstUpdate = useRef(true);

  const fetchImage = async (person: Person) => {
    if (person.image) {
      const response = await getImage(apiClient, person.image);
      if (response.status === 200 && response.body) setImage(response.body.url);
      else setImage("");
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      fetchImage(guest);
      firstUpdate.current = false;
    }
  });

  return (
    <div className={`${className} flex-col flex items-center`}>
      <img
        className="w-24 h-24 rounded-full shadow-md object-cover"
        id="img"
        src={image}
        alt="Guest avatar"
      ></img>
      <p className="text-md">{parseFullName(guest)}</p>
    </div>
  );
};
export default Guest;
