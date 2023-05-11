import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { API_KEY } from "../../secrets";
import { useSelector } from "react-redux";

const MapData = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

function Map() {
  const { listings } = useSelector((state) => state);

  const center = useMemo(
      () => ({ lat: 40.697679968368114, lng: -74.03137868378906 }),
      []
  );
  return (
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
        {listings.map((listing) => (
          <Marker
                key={listing.id}
                position={{ lat: parseFloat(listing.lat), lng: parseFloat(listing.long) }}
            />
        ))}
      </GoogleMap>
  );
}

export default MapData;
