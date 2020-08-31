import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Components/Marker";

const SampleView = () => {
  const mapConfig = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string | "",
        }}
        defaultCenter={mapConfig.center}
        defaultZoom={mapConfig.zoom}
      >
        <Marker
          lat={59.955413}
          lng={30.337844}
          name="My Marker"
          color="#779BE7"
        />
      </GoogleMapReact>
    </div>
  );
};

export default SampleView;
