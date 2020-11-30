import React from "react";
// Custom components
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TaskBar from "../components/TaskBar";

export default function SampleView() {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50">
        <Header barTitle="Sample View!" />
        <TaskBar />
      </div>
    </div>
  );
}
