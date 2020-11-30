import React, { ReactNode } from "react";

export type ConfirmDialogueProps = {
  dialogue?: string;
  image?: string;
  confirmMessage?: string;
  buttonColor?: string;
  hide(): void | Promise<void>;
  confirmAction(): void | Promise<void>;
  children?: ReactNode;
};

export const ConfirmDialogue = ({
  dialogue,
  confirmMessage = "Aceptar",
  buttonColor = "#445068",
  image,
  hide,
  confirmAction,
  children,
}: ConfirmDialogueProps) => {
  const onConfirm = () => {
    confirmAction();
    hide();
  };

  return (
    <div className="absolute bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <div className="bg-white rounded m-auto p-4 m-4 md:p-8 lg:p-16 flex flex-col justify-center align-center">
        {children ? (
          children
        ) : (
          <div>
            <p className={`${image && "mb-16"} text-xl text-center`}>
              {dialogue}
            </p>
            {image && (
              <img
                className="h-32 lg:h-40 mx-auto"
                src={image}
                alt="Dialogue"
              />
            )}
          </div>
        )}
        <div className="mt-8 md:mt-16 flex lg:flex-col mx-auto">
          <button
            onClick={onConfirm}
            style={{ backgroundColor: buttonColor }}
            className="lg:mx-auto mt-4 mr-8 block p-2 px-6 text-white rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            {confirmMessage}
          </button>
          <button
            onClick={hide}
            className="lg:mx-auto mt-4 block p-2 px-6 text-white bg-gray-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDialogue;
