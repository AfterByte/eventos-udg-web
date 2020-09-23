import React, { Component, useState, useContext } from "react";
import MapComponent from "../Components/MapComponent";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import SideBar from "../Components/SideBar";
import { ResponsiveContext, RespContextPayload } from "../Components/Routes";

export default function LocationEdit() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;

  return (
    <div className="h-full">
      <div className="grid grid-cols-6 h-screen">
        <div
          className={
            !sidebarHidden
              ? "hidden sm:grid sm:col-span-1 sm:fixed sm:h-full sm:z-20 sm:w-1/6"
              : "col-span-6 sm:grid sm:col-span-1 z-20 sm:fixed h-full"
          }
        >
          <SideBar />
        </div>
        {!sidebarHidden ? (
          <div className="fixed z-10 w-full">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-start-2 sm:col-end-7">
                <Header barTitle={"Editar Ubicación"} />
                <Taskbar />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-4 sm:col-start-2 sm:col-end-7 w-full h-full pt-24 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <MapComponent isCreate={false}/>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  )
}
