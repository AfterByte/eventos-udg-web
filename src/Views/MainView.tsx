import React, { Component } from 'react'
import SideBar from '../Components/SideBar'
import Menu from '../Components/Menu'

export default class MainView extends Component {
  render() {
    return (
      <div className="grid grid-cols-6 h-full w-full">
        <div className="grid col-span-1 h-screen">
          <SideBar/>
        </div>
      </div>
    )
  }
}
