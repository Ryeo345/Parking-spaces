import axios from 'axios';
const listings = (state = [], action)=> {
    if(action.type === 'SET_LISTINGS'){
        return action.listings;
    }
    if(action.type === 'CREATE_LISTING'){
        return [...state, action.listing];
    }
    if (action.type === 'UPDATE_LISTING') {
        return state.map(listing => {
            if(listing.id === action.listing.id) {
                return action.listing;
            }
            return listing;
        })
    }
    if(action.type === 'DELETE_LISTING'){
        return state.filter(listing => listing.id !== action.listing.id);
    }
    return state;
};

export const fetchListings = () => {
    return async (dispatch) => {
        const response = await axios.get("/api/listings");
        dispatch({type: "SET_LISTINGS", listings: response.data});
    }
}

export const createListing = (listing) => {
    return async(dispatch) => {
        const response = await axios.post("/api/listings", listing);
        dispatch({type: "CREATE_LISTING", listing: response.data});
    }
}
export const updateListing = (listing) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/listings/${listing.id}`, listing);
        dispatch({type: "UPDATE_LISTING", listing: response.data});
    }
}

export const removeListing = (listing) => {
    return async(dispatch) => {
        await axios.delete(`/api/listings/${listing.id}`);
        dispatch({type: "DELETE_LISTING", listing});
    }
}
export default listings;