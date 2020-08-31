import React from "react";
import "../assets/markers.css";

type MarkerProps = {
  id?: any;
  lat: number;
  lng: number;
  color: string;
  name: string;
};

const Marker = ({ color, name }: MarkerProps) => {
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};
export default Marker;
