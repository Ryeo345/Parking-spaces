import axios from 'axios';
const listings = (state = [], action)=> {
    if(action.type === 'SET_LISTINGS'){
        return action.listings;
    }
    if(action.type === 'CREATE_LISTING'){
        return [...state, action.listing];
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
export default listings;