import React from "react";
import { useSelector } from "react-redux";
import MapData from "./MapData";
import { Link } from 'react-router-dom'

const Rentals = () => {
    const { listings , users} = useSelector(state => state);
    return (
        <div id="page-layout">
            <MapData />
            <div id='content-container'>
                {
                    listings.map(listing => {
                        let host = users.find(user => listing.userId === user.id);
                        if (!host) {
                            return null;
                        }
                        return (
                            <div key={listing.id} className='listing-container'>
                                <Link to={`/listings/${listing.id}`}>
                                    <div className='listing-img-container'>
                                            <img className='listing-img' src={listing.photo} />
                                    </div>
                                    <div className='listing-info-container'>
                                            <span>{listing.length} X {listing.width}</span>
                                            <span>{listing.city}, {listing.state}</span>
                                    </div>
                                    <div>
                                        hosted by {host.username}
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>

);
}

export default Rentals;