import React, { useEffect } from "react";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Rentals from "./Rentals";
import { fetchListings } from "../store";
import NavBar from "./NavBar";
import CreateListing from "./CreateListing";
const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchListings());
  }, []);

  return (
    <div>
      {
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Rentals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createListing" element={<CreateListing />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
