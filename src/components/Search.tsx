import React from "react";
import { IMarker } from "./Maps";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const endpoint = "http://ip-api.com/json/?fields=lat,lon";

type SearchProps = {
  setMarker(marker: IMarker): void;
  setAddress(address: string): void;
  address: string;
  marker: IMarker | undefined;
};
export default function Search({
  setAddress,
  setMarker,
  address,
  marker,
}: SearchProps) {
  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng = (await getLatLng(results[0])) as {
      lat: number;
      lng: number;
    };
    setAddress(value);
    setMarker({ name: "result", ...latLng });
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label
              htmlFor=""
              className="font-sans font-thin text-grey-darker mt-4 text-lg mb-2"
            >
              Busca un lugar
            </label>
            <input
              {...getInputProps({
                placeholder: "Av. Emiliano Zapata #25, Col. Centro",
              })}
              className="appearance-none w-full mt-4 h-8 bg-white border border-black hover:border-grey rounded shadow "
              type="text"
              name="serchBar"
              id="serchBar"
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
            <p className="text-sm mt-4 font-thin">
              Nota: Puedes colocar tu marcador en la ubicación exacta, y ajustar
              el domicilio en el formulario.
            </p>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
