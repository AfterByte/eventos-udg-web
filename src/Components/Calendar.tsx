import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

export default class Calendar extends React.Component {
  render() {
    return (
      <div className="mt-8 mb-5 ">
        <FullCalendar
          plugins={[listPlugin]}
          initialView="listWeek"
          events={[
            {
              title: "baile grupero",
              start: "2020-10-19T16:30:00",
              end: "2020-10-19T18:30:00",
            },
            {
              title: "Conferencia perrona",
              start: "2020-10-19T14:30:00",
              end: "2020-10-19T15:30:00",
            },
            { title: "event 3", date: "2020-10-20" },
            { title: "event 4", date: "2020-10-20" },
            { title: "event 5", date: "2020-10-21" },
            { title: "event 6", date: "2020-10-21" },
            { title: "event 7", date: "2020-10-22" },
            { title: "event 8", date: "2020-10-22" },
            { title: "event 9", date: "2020-10-23" },
            { title: "event 10", date: "2020-10-23" },
            { title: "event 12", date: "2020-10-24" },
            { title: "event 13", date: "2020-10-24" },
          ]}
        />
      </div>
    );
  }
}
