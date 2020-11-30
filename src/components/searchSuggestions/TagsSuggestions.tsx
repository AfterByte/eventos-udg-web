import React, { useContext, useEffect, useState } from "react";
// Custom components
import { Suggestions } from "../elements/Search";
// Context
import { AuthContext, AuthProviderPayload } from "../AuthProvider";
// Payload types
import { Tag } from "../../helpers/payloads";
// Helpers
import { formatStrTag, typeOf } from "../../helpers/validationFunctions";
import { indexTags } from "../../helpers/apiClient";

export default function TagsSuggestions({
  input,
  submit,
  reset,
  className,
}: Suggestions) {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  const [tags, setTags] = useState<Tag[]>([]);

  const searchTags = async (name: string) => {
    // Format the tag search input
    name = formatStrTag(name);
    if (!name) return;

    const response = await indexTags(apiClient, { name, limit: 10 });
    if (response.status === 204) setTags([]);
    else if (response.body && typeOf<{ tags: Tag[] }>("tags", response.body))
      setTags(response.body.tags);
    else console.log(response);
  };

  const send = (i: string) => {
    submit(i);
    reset();
  };

  useEffect(() => {
    searchTags(input);
  }, [input]);

  return (
    <div
      className={`${className} absolute bg-white rounded-b-md border mt-10 w-full flex-grow`}
    >
      {tags.length > 0 ? (
        tags.map((tag, index) => (
          <p
            key={index}
            className="border-b py-1 pl-1 cursor-pointer hover:bg-gray-500 hover:bg-opacity-25"
            onClick={() => send(tag.name)}
          >
            #{tag.name}
          </p>
        ))
      ) : (
        <p className="text-center p-2">
          Haga click en "Agregar" para agregar etiqueta
        </p>
      )}
    </div>
  );
}
