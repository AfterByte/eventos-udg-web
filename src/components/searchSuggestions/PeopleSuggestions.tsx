import React, { useContext, useEffect, useRef, useState } from "react";
// Custom components
import { Suggestions } from "../elements/Search";
// Context
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
// Payload types
import { Attachment, Person } from "../../helpers/payloads";
// Helpers
import { parseFullName, typeOf } from "../../helpers/validationFunctions";
import { getImage, indexPeople } from "../../helpers/apiClient";

type PersonMiniCardProps = {
  person: Person;
  setPerson(person: Person): void;
};

const PersonMiniCard = ({ person, setPerson }: PersonMiniCardProps) => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [image, setImage] = useState("");
  const firstUpdate = useRef(true);

  const fetchImage = async (image?: Attachment) => {
    if (image) {
      const response = await getImage(apiClient, image);
      if (response.status === 200 && response.body) setImage(response.body.url);
      else setImage("");
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      fetchImage(person.image);
      firstUpdate.current = false;
    }
  });

  return (
    <div
      onClick={() => setPerson(person)}
      className="border-b py-1 pl-1 cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 flex items-center"
    >
      <img
        className="object-cover w-12 h-12 mr-2 rounded-full"
        src={image}
        alt={`${person.name} avatar`}
      />
      <p className="">{parseFullName(person)}</p>
    </div>
  );
};

export type PeopleSearchOpts = {
  setPerson(person: Person): void;
  showPersonForm(): void;
};

export default function PeopleSuggestions({
  input,
  reset,
  className,
  options,
}: Suggestions<PeopleSearchOpts>) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const [people, setPeople] = useState<Person[]>([]);

  const { setPerson, showPersonForm } = options as PeopleSearchOpts;

  const searchPeople = async (name: string) => {
    if (!name) return;
    const response = await indexPeople(apiClient, {
      name,
      limit: 8,
      orderBy: ["lastname:asc", "name:asc"],
    });
    if (response.status === 204) setPeople([]);
    else if (
      response.body &&
      typeOf<{ people: Person[] }>("people", response.body)
    )
      setPeople(response.body.people);
    else console.log(response);
  };

  useEffect(() => {
    searchPeople(input);
  }, [input]);

  return (
    <div
      className={`${className} absolute bg-white rounded-b-md border mt-10 w-full flex-grow`}
    >
      {people.length > 0 ? (
        people.map((person, index) => (
          <PersonMiniCard
            person={person}
            setPerson={(person) => {
              setPerson(person);
              reset();
            }}
            key={index}
          />
        ))
      ) : (
        <button onClick={showPersonForm} className="text-center p-2">
          Click aquí para registar una nueva persona
        </button>
      )}
    </div>
  );
}
