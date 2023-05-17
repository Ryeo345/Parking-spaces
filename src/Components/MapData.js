import React, { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker , InfoWindow} from "@react-google-maps/api";
import secrets from "../../secrets";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const MapData = () => {
  const { listings } = useSelector((state) => state);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: secrets.API_KEY,
  });
  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };
  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const center = useMemo(
    () => ({ lat: 40.697679968368114, lng: -74.03137868378906 }),
    []
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={{
            lat: parseFloat(listing.lat),
            lng: parseFloat(listing.long),
          }}
          title={listing.storage_type}
          onClick={() => {
            handleMarkerClick(listing);
          }}
        />
      ))}
      {activeMarker && (
          <InfoWindow
              position={{ lat: parseFloat(activeMarker.lat), lng: parseFloat(activeMarker.long) }}
              onCloseClick={handleInfoWindowClose}
          >
            <div className="infoWindow-container">
              <Link to={`/listings/${activeMarker.id}`}>
                <img className='infoWindow-img' src={activeMarker.photo} />
                <span><b>{activeMarker.length}X{activeMarker.width}</b> {activeMarker.storage_type} </span>
                <span>{activeMarker.city}, {activeMarker.state}</span>
              </Link>
            </div>
          </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapData;
