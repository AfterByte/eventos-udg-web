import React from "react";
//icons & images
import Confirm from "../assets/icons/confirmIcon.svg";
import Clear from "../assets/icons/clear-black.svg";
import ThrowImage from "../assets/images/Throw_away.svg";

interface GetTicketConfirmProps {
  event: string;
  hide(): void | Promise<void>;
  confirmAction(): void | Promise<void>;
  isEnroll: boolean;
}

export default function GetTicketConfirm({
  event,
  hide,
  confirmAction,
  isEnroll
}: GetTicketConfirmProps) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
      <div className="xl:ml-64">
        <div className="bg-white rounded mt-48 xl:mt-64 sm:mx-56 px-4 pb-4 xl:py-12 w-auto grid grid-cols-2 text-center">
          <div className="xl:hidden col-span-2">
            <div className="flex justify-end">
              <button onClick={hide} className="">
                <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
              </button>
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1">
            <div className="flex justify-end">
              {isEnroll
                ? <img className="h-64 xl:py-8" src={Confirm} alt="" />
                : <img className="h-64 xl:py-8" src={ThrowImage} alt="" />
              }
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1">
            <div className="hidden xl:flex justify-end">
              <button onClick={hide} className="">
                <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
              </button>
            </div>
            <p className="text-lg xl:pt-16 pb-2">
              {isEnroll
              ? `Estas por inscribirte al evento ${event}, ¿Desea proceder?`
              : `Estas por cancelar tu reservación al evento ${event}, ¿Desea proceder?`}
            </p>
            {isEnroll
            ? <button
                onClick={confirmAction}
                className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Adquirir entrada
              </button>
            : <button
                onClick={confirmAction}
                className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              >
                Cancelar reservación
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
