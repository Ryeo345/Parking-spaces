import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { removeListing } from '../store/listings';

const MyListings = () => {
  const { listings, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  let parkingSpots = listings.filter((listing) => listing.userId === auth.id);
  return (
    <div>
      <div>
        <h1>My Listings</h1>
      </div>
      <div>
        <ul>
          {parkingSpots.map((parkingSpot) => {
            return (
              <li key={parkingSpot.id} className="myListings-container">
                <Link to={`/listings/${parkingSpot.id}`}>
                  <img className="myListing-img" src={parkingSpot.photo} />
                  {parkingSpot.street} {parkingSpot.city} {parkingSpot.state}{" "}
                  <b>({parkingSpot.bookingStatus})</b>
                </Link>
                <Button
                  onClick={() => {
                    dispatch(removeListing(parkingSpot));
                  }}
                >
                  Remove
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MyListings;
