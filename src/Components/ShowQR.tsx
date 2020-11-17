import React, { useEffect, useState } from "react";
import { Event } from "../helpers/payloads";

/**IMPORT QR CODE GENERATE */
import QRCode from "qrcode";

//icons
import Clear from "../assets/icons/clear-black.svg";
import download from "../assets/icons/download.svg";

interface ShowQRProps {
  thing: string;
  hide(): void | Promise<void>;
  Events: string | undefined;
}

const ShowQR = ({ thing, hide, Events }: ShowQRProps) => {
  const onConfirm = async () => {
    await hide();
  };

  /**QR GENERATE CODE */
  const [url, setUrl] = useState("");
  async function generateQR() {
    const url = await QRCode.toDataURL(Events || "");
    setUrl(url);
  }

  useEffect(() => {
    if (!url) generateQR();
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
      <div className="xl:ml-64 ">
        <div className="bg-white rounded mt-40 xl:mt-48 sm:mx-56 px-4 pb-4 xl:py-12 w-auto grid grid-cols-2 text-center">
          <div className="xl:hidden col-span-2">
            <div className="flex justify-end">
              <button onClick={hide} className="">
                <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
              </button>
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1">
            <div className="flex w-full justify-end">
              <img className="w-6/12 mr-20" src={url} alt="" />
            </div>
          </div>
          <div className="col-span-1 xl:col-span-1">
            <div className="hidden xl:flex justify-end">
              <button onClick={hide} className="">
                <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
              </button>
            </div>
            <p className="text-lg xl:pt-12 pb-2">
              {`Este es el codigo QR de tu evento`}
            </p>
            <p className="text-lg font-light xl:pt-6 pb-2">
              {`¡Compartelo para que otras personas puedan unirse al evento!`}
            </p>
            <div></div>
            <a href={url} download>
              <button className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                <div className="flex">
                  <img className="mr-2" src={download} />
                  <p>Descargar QR</p>
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowQR;
