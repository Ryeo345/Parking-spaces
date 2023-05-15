import React from "react";
import { useSelector } from "react-redux";
import MapData from "./MapData";
import { Link } from 'react-router-dom'

const Rentals = () => {
    const { listings } = useSelector(state => state);
    return (
        <div id="page-layout">
            <MapData />
            <div id='content-container'>
                {
                    listings.map(listing => {
                        return (
                            <div key={listing.id} className='listing-container'>
                                <div className='listing-img-container'>
                                    <Link to={`/listings/${listing.id}`}>
                                        <img className='listing-img' src={listing.photo} />
                                    </Link>
                                </div>
                                <div className='listing-info-container'>
                                    <Link to={`/listings/${listing.id}`}>
                                        {listing.length} X {listing.width}
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

);
}

export default Rentals;