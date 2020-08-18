import React, { Component } from "react";
import NotificationIcon from '../assets/icons/notifications.svg'
import Perfil from '../Components/Perfil'

interface props{
  userName: string,
  barTitle: string
}

export default class Header extends Component<props> {
  render() {
    return (
      <div className="col-start-2 col-end-7 grid xl:grid-cols-2 md:grid-cols-2 grid-cols-2 shadow-md text-center md:w-auto max-h-auto items-center py-2 sm:py-5 bg-white">
        <div className="text-center font-medium text-2xl md:text-right">
          <p>{this.props.barTitle}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 items-center">
          <div className="col-span-1 sm:col-span-3 xl:mr-2 flex justify-end">
            <button><img className="h-6" src={NotificationIcon} alt={"NotificationIcon"}/></button>
          </div>
          <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-end">
            <Perfil userName={this.props.userName}/>
          </div>
        </div>
      </div>
    );
  }
}
