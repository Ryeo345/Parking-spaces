import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
const Homepage = () => {

  return (
    <div className="Home">
      <div>
        <img src="static/parking_lot_aerial_diagonal.jpg"/>
      </div>
      <div>
        <p>
          Find Your Perfect Parking Spot Today!
        </p>
      </div>
    </div>


  );
};

export default Homepage;
