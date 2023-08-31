import React, { useEffect } from "react";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Rentals from "./Rentals";
import { fetchListings, fetchUsers } from "../store";
import NavBar from "./NavBar";
import CreateListing from "./CreateListing";
import IndividualListing from "./IndividualListing";
import MyListings from "./MyListings";
import MyBookings from "./MyBookings";
import Homepage from "./Homepage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchListings());
    dispatch(fetchUsers());
  }, []);

  return (

      <div>
        {
          <div>
            <NavBar />
            <Homepage />
            <Routes>
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createListing" element={<CreateListing />} />
              <Route path="/MyListings" element={<MyListings />} />
              <Route path="/MyBookings" element={<MyBookings />} />
              <Route path="/listings/:id" element={<IndividualListing />} />
            </Routes>
          </div>
        }
      </div>

  );
};

export default App;
