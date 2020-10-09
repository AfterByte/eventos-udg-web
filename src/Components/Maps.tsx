import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "@reach/combobox/styles.css";
import Marker from "../Components/Marker";

export type IMarker = {
  lat: number;
  lng: number;
  name: string;
  color?: string;
};

type MapsProps = {
  marker: IMarker | undefined;
};

fetch("http://ip-api.com/json/?fields=lat,lon")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });

const Maps = ({ marker }: MapsProps) => {
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState<{ lat: number; lng: number }>();
  useEffect(() => {
    const center = async () => {
      if (loading) {
        const response = await fetch("http://ip-api.com/json/?fields=lat,lon");
        const location = await response.json();
        setCenter({ lat: location.lat, lng: location.lon });
        setLoading(false);
      }
    };
    center();
  });
  const mapConfig = {
    center,
    zoom: 10,
  };

  let color = "#779BE7";
  if (marker?.color) color = marker.color;
  if (marker) {
    mapConfig.center = { lat: marker.lat, lng: marker.lng };
    mapConfig.zoom = 15;
  }

  return (
    // Important! Always set the container height explicitly
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string | "",
        }}
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
  );
};

export default Maps;
