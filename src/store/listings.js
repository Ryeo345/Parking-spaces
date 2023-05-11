import axios from 'axios';
const listings = (state = [], action)=> {
    if(action.type === 'SET_LISTINGS'){
        return action.listings;
    }
    return state;
};

export const fetchListings = () => {
    return async (dispatch) => {
        const response = await axios.get("/api/listings");
        dispatch({type: "SET_LISTINGS", listings: response.data});
    }
}
export default listings;