import React from "react";
import { useSelector } from "react-redux";
import GoogleMap from "./MapData";

const Rentals = () => {
    const { listings } = useSelector(state => state);
    return (
        <div>
            <GoogleMap />
            <div>
                {
                    listings.map(listing => {
                        return (
                            <div key={listing.id}>
                                <p>{listing.name}</p>
                                <img src={listing.photo} />
                            </div>
                        )
                    })
                }
            </div>
        </div>

);
}

export default Rentals;