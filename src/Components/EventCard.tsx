import React, { Component } from "react";
import { Link } from "react-router-dom";
import ScheduleIcon from "../assets/icons/schedule-black.svg";
//import event interface
import { Event } from "../helpers/payloads"

interface EventeCardProps {
  event: Event;
}

export default class EventCard extends Component<EventeCardProps> {
  render() {
    return (
      <Link to={`/events/${this.props.event.id}`} className="cardSpam col-span-1 sm:col-span-4 bg-white max-h-full w-full rounded overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
        <img
          className="w-full h-20 hidden sm:flex sm:h-48"
          id="img"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FKkh5gmmcxH4%2Fhqdefault.jpg&f=1&nofb=1"
          alt="Sunset in the mountains"
        ></img>
        <div className="px-6 py-4 grid grid-cols-4 items-center justify-between">
          <div className="col-span-3 font-bold text-md sm:text-xl mb-2">
            {this.props.event.name}
          </div>
          <p className="col-span-1 text-red-500 text-sm xl:text-base flex justify-end">
            {this.props.event.capacity}/{this.props.event.capacity}
          </p>
          <div className="col-span-4 font-normal text-md sm:text-xl mb-2">
            {this.props.event.organizer.name} {this.props.event.organizer.lastname} {this.props.event.organizer.second_lastname}
          </div>
          <div className="col-span-4 flex items-center">
            <img className="h-6 mr-2" src={ScheduleIcon} alt={"ScheduleIcon"} />
            <div className="font-normal text-sm sm:text-xl">
              {this.props.event.reservation.start.toDateString()}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
