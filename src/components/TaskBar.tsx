import React, { useState } from "react";
import { Tag } from "../helpers/payloads";
import { OrderBy, Search, TagSpan } from "./elements";

const TaskBar = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const removeTag = (tag: Tag) => {
    const i = tags.findIndex((t) => t.id === tag.id);
    if (i !== -1) {
      const tc = tags.slice(0);
      tc.splice(i, 1);
      setTags(tc);
    }
  };

  return (
    <div className="grid grid-cols-8 shadow-md w-full py-2 md:py-5 bg-white mt-0 md:mt-2">
      <OrderBy
        className="col-span-2"
        options={[
          {
            name: "Fecha (Cercanos)",
            behavior: () => {
              console.log("hola perros");
            },
          },
          {
            name: "Fecha (Lejanos)",
            behavior: () => {},
          },
          {
            name: "Cupo (Más llenos)",
            behavior: () => {},
          },
          {
            name: "Cupo (Menos llenos)",
            behavior: () => {},
          },
        ]}
      />
      <div className="col-span-6 flex">
        <div className="flex flex-row justify-end ml-auto mr-1 w-1/2">
          {tags.map((tag) => (
            <TagSpan tag={tag} remove={removeTag} />
          ))}
        </div>
        <Search
          responsive
          form
          className="mr-4 w-1/2 xl:w-1/3"
          submit={(input) => {
            setTags([...tags, { id: `${tags.length}`, name: input }]);
          }}
          placeholder="Sample search"
          Suggestions={({ input, className }) => {
            return (
              <div
                className={`absolute bg-white rounded-b-md border mt-10 w-full flex-grow ${className}`}
              >
                {input}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
export default TaskBar;
