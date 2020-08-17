import React, { Component } from 'react'
import SideBar from '../Components/SideBar'
import Menu from '../Components/Menu'

export default class MainView extends Component {
  render() {
    return (
      <div>
        <SideBar/>
        <Menu/>
      </div>
    )
  }
}
