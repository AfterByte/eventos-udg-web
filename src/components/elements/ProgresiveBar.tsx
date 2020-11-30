import React from "react";
// Asssets
import ArrowIcon from "../../assets/icons/right-arrow.svg";

interface ProgresiveBarProps {
  sections: { name: string; next: boolean }[];
  currentSection: number;
  setCurrentSection(section: number): void;
}

const ProgresiveBar = ({
  sections,
  currentSection,
  setCurrentSection,
}: ProgresiveBarProps) => {
  return (
    <div className="flex shadow-md justify-center items-center py-2 md:py-5 bg-white mt-0 md:mt-2">
      {sections[currentSection - 1] && (
        <button
          className="flex mr-4 opacity-75 justify-self-start"
          onClick={() => {
            setCurrentSection(currentSection - 1);
          }}
        >
          <img
            className="h-5 my-auto mr-2"
            src={ArrowIcon}
            alt="Arrow"
            style={{ transform: "scaleX(-1)" }}
          />
          <p className="text-xl font-light">
            {sections[currentSection - 1].name}
          </p>
        </button>
      )}
      <h1 className="text-2xl font-light justify-self-center">
        {sections[currentSection].name}
      </h1>
      {sections[currentSection + 1] && (
        <button
          className={`flex ml-4 opacity-75 justify-self-end ${
            !sections[currentSection].next && "cursor-not-allowed"
          }`}
          onClick={() => {
            if (sections[currentSection].next)
              setCurrentSection(currentSection + 1);
          }}
        >
          <p className="text-xl font-light">
            {sections[currentSection + 1].name}
          </p>
          <img className="h-5 my-auto ml-2" src={ArrowIcon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};
export default ProgresiveBar;
