import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const MyListings = () => {
    const { listings , auth} = useSelector(state => state);
    let parkingSpots = listings.filter(listing => listing.userId === auth.id)
    return (
        <div>
            <div><h1>My Listings</h1></div>
            <div>
                <ul>
                    {
                        parkingSpots.map(parkingSpot => {
                            return (
                                <li key={parkingSpot.id} className='myListings-container'>
                                            <Link to={`/listings/${parkingSpot.id}`}>
                                                <img className='myListing-img' src={parkingSpot.photo} />
                                                {parkingSpot.length} X {parkingSpot.width}
                                            </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>

);
}

export default MyListings;