import React, { Component } from "react";
import SideBar from '../Components/SideBar'
import EventCard from '../Components/EventCard'
import Header from '../Components/Header'
import Taskbar from '../Components/TaskBar'

interface props{
  userName: string,
  barTitle: string,
  events: {id: number, name: string, capacity: number, description: string, organizer: string, status: string, date: string, maxCapacity: number}[]
}

export default class UpcomingEvents extends Component<props> {
  render() {
    return (
      <div className="h-full">
        <div className="grid grid-cols-6 h-screen">
          <div className="hidden sm:grid col-span-1 fixed h-full w-1/6">
            <SideBar/>
          </div>
          <div className="fixed z-10 w-full">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-start-2 sm:col-end-7">
                <Header userName={this.props.userName} barTitle={this.props.barTitle}/>
                <Taskbar/>
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-12">
            <div className="grid grid-cols-12 mt-12 sm:mt-24 mb-4 sm:mb-8">
              <div className="col-start-2 col-end-12 gap-4 grid sm:grid-cols-12 grid-cols-1 mt-8 pb-1">
                {this.props.events.map(event => (
                  <EventCard key={event.id} name={event.name} capacity={event.capacity} description={event.description} organizer={event.organizer} status={event.status} date={event.date} maxCapacity={event.maxCapacity}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}