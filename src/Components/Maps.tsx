import React from "react";
import GoogleMapReact from "google-map-react";
import "@reach/combobox/styles.css";
import Marker from "../Components/Marker";
import Search from "../Components/Search";
import { type } from "os";

export type IMarker = {
  lat: number;
  lng: number;
  name: string;
  color?: string;
};

type MapsProps = {
  marker: IMarker | undefined;
};

const Maps = ({ marker }: MapsProps) => {
  const mapConfig = {
    center: {
      /**TODO: CHANGE */
      lat: 19.704939,
      lng: -103.457813,
    },
    zoom: 11,
  };

  let color = "#779BE7";
  if (marker?.color) color = marker.color;
  if (marker) {
    mapConfig.center = { lat: marker.lat, lng: marker.lng };
    mapConfig.zoom = 15;
  }

  return (
    // Important! Always set the container height explicitly
    <div className="ml-4 mr-4 ">
      <div className=" mb-6" style={{ height: "62vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string | "",
          }}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
          center={mapConfig.center}
          zoom={mapConfig.zoom}
        >
          {marker ? (
            <Marker
              lat={marker.lat}
              lng={marker.lng}
              name={marker.name}
              color={color}
            />
          ) : null}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Maps;
