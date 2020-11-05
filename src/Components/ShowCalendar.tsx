import React from "react";
import ThrowImage from "../assets/images/Throw_away.svg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

//icons
import Clear from "../assets/icons/clear-black.svg";

interface ShowCalendarProps {
  thing: string;
  hide(): void | Promise<void>;
  deleteAction(): void | Promise<void>;
}

export default function ShowCalendar({
  thing,
  hide,
  deleteAction,
}: ShowCalendarProps) {
  const onConfirm = async () => {
    await deleteAction();
    await hide();
  };

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
              <FullCalendar
                dateClick={function (info) {
                  alert("clicked " + info.dateStr);
                }}
                select={function (info) {
                  alert("selected " + info.startStr + " to " + info.endStr);
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
              />
            </div>
          </div>
          <div className="col-span-2 xl:col-span-1">
            <div className="hidden xl:flex justify-end">
              <button onClick={hide} className="">
                <img className="h-8" src={Clear} alt={"ClearTagIcon"} />
              </button>
            </div>
            <p className="text-lg xl:pt-32 pb-2">
              {`${thing} las fechas de tu evento`}
            </p>
            <button
              /*  onClick={onConfirm} */
              className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
            >
              {`Apartar ubicacion`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
