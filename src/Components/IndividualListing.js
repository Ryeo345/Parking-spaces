import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
const IndividualListing = () => {
  const {listings} = useSelector((state) => state);
  const { id } = useParams();
  const listing = listings.find(listing => listing.id === id);
    if(!listing) { // prevents the React app from crashing when the page is refreshed
        return null;
    }
        return (
          <div>
            <div>
              <img src={listing.photo} />
            </div>
            <div>
              <span>
                {listing.length} X {listing.width}
              </span>
            </div>
            <div>
              <span>
                {listing.city}, {listing.state}
              </span>
            </div>
          </div>
  );
};

export default IndividualListing;
