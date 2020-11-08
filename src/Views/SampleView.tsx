import React from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";

export default function SampleView() {
  return (
    <div>
      <SideBar />
      <section>
        <Header barTitle="Sample View" />
        <div>Hello world</div>
      </section>
    </div>
  );
}
