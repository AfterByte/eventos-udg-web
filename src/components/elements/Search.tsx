import React, { useRef, useState } from "react";
// Helpers
import { useOutsideClick } from "../../helpers/outsideClick";
// Types
import { Tag } from "../../helpers/payloads";
// Assets
import SearchIcon from "../../assets/icons/search-black.svg";
import Clear from "../../assets/icons/clear-black.svg";

export type Suggestions<T = any> = {
  className?: string;
  input: string;
  submit(input: string): void;
  reset(): void;
  options?: T;
};

type SearchProps<T> = {
  buttonText?: string;
  className?: string;
  placeholder?: string;
  responsive?: boolean;
  form?: boolean;
  submit(input: string): void | Promise<void>;
  Suggestions?(props: Suggestions<T>): JSX.Element;
  suggestionsOptions?: T;
};

export const Search = <T extends any>({
  buttonText = "Buscar",
  className,
  placeholder,
  responsive = false,
  form = false,
  submit,
  Suggestions,
  suggestionsOptions,
}: SearchProps<T>) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setFocus(false);
  });

  const send = (i: string) => {
    if (i) {
      submit(i);
      setInput("");
    }
  };

  const content = (
    <div className="flex-grow flex flex-row">
      <div className="flex flex-grow border border-gray-500 border-opacity-50">
        <img
          className={`${
            responsive && "hidden md:block"
          } px-2 bg-gray-500 bg-opacity-50`}
          style={{ opacity: "0.5" }}
          src={SearchIcon}
          alt={"Search icon"}
        />
        <input
          onFocus={() => setFocus(true)}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
          className="px-2 bg-gray-500 bg-opacity-25 w-full"
          type="text"
          placeholder={placeholder}
        />
      </div>
      <button
        type={form ? "submit" : "button"}
        onClick={() => {
          if (!form) send(input);
        }}
        className={`${
          responsive ? "px-2 md:px-4 md:py-2" : "px-4 py-2 "
        } text-md font-normal text-white bg-blue-500 items-center`}
      >
        <p className={`${responsive && "hidden"} md:block`}>{buttonText}</p>
        {responsive && (
          <img
            className="h-10 w-10 md:hidden"
            src={SearchIcon}
            color="#fff"
            alt={"Search icon"}
          />
        )}
      </button>
      {Suggestions && (
        <Suggestions
          options={suggestionsOptions}
          className={`${!(input && focus) && "hidden"}`}
          input={input}
          submit={submit}
          reset={() => setInput("")}
        />
      )}
    </div>
  );

  return form ? (
    <form
      ref={wrapperRef}
      className={`flex flex-row relative ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        send(input);
      }}
    >
      {content}
    </form>
  ) : (
    <div ref={wrapperRef} className={`flex flex-row relative ${className}`}>
      {content}
    </div>
  );
};

type TagSpanProps = {
  tag: Tag;
  remove(tag: Tag): void | Promise<void>;
};
export const TagSpan = ({ tag, remove }: TagSpanProps) => {
  return (
    <span className="flex bg-gray-200 rounded-full border border-gray-500 border-dashed my-1 px-4 py-1 text-sm text-gray-700 mx-1">
      <p className="col-span-5 my-auto">{tag.name}</p>
      <button
        onClick={() => {
          remove(tag);
        }}
      >
        <img className="h-4 ml-1" src={Clear} alt={"Clear tag icon"} />
      </button>
    </span>
  );
};

export default Search;
