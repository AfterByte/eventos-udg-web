import React, { useEffect, useRef, useState } from "react";
// Helpers and payloads
import { Event } from "../../helpers/payloads";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
// Assets
import Clear from "../../assets/icons/clear-black.svg";

export type ShareEventProps = {
  event?: Event;
  hide(): void | Promise<void>;
};

export const ShareEvent = ({ event, hide }: ShareEventProps) => {
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  const firstUpdate = useRef(true);

  const getQr = async () => {
    const url = await QRCode.toDataURL(
      `${window.location.host}/events/${event?.id}`
    );
    setQr(url);
  };

  const copyQR = async () => {
    copy(`${window.location.host}/events/${event?.id}`);
    setCopied(true);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getQr();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="absolute bg-black bg-opacity-25 w-full h-full flex flex-col justify-center">
      <div className="bg-white rounded m-auto p-4 m-4 md:p-8 lg:p-16 flex">
        <img
          className="hidden md:block h-48 xl:h-64 my-auto"
          src={qr}
          alt="Event QR"
        />
        <div className="flex flex-col justify-center items-center">
          <button onClick={hide} className="ml-auto">
            <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
          </button>
          <p className="text-xl text-center">Este es el código QR del evento</p>
          <p className="text-lg text-center">
            !Compártelo para que el público conozca tu evento!
          </p>
          <div className="mt-8 flex lg:flex-col mx-auto">
            <a
              href={qr}
              download={`eventoqr_${event?.name}`}
              className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-teal-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              Descargar QR
            </a>
            <p className="mt-4 text-center">Ó</p>
            <button
              onClick={copyQR}
              className="mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-indigo-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              {copied ? "Copiado" : "Copiar al portapapeles"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShareEvent;
