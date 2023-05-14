import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const NavBar = () => {
    const { auth } = useSelector((state) => state);
    const [style, setStyle] = useState({
        display: "none",
        flexDirection: "column",
        alignItems: "flex-end",
    });
    const [True, setTrue] = useState(false);
    const dispatch = useDispatch();

    const location = useLocation();
    const view = location.pathname;
    const navigate = useNavigate();

    const displayLogin = () => {
        if (!True) {
            setTrue(true);
            return {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            };
        } else {
            setTrue(false);
            return { display: "none" };
        }
    };

    return (
        <nav>
            <div id="topNav">
                <Link to="/">
          <span id="ss-logo">
            Home
          </span>
                </Link>

                <div id="navRight">
                    {auth.id ? (
                        <div style={{ marginBottom: ".15em" }}>
                        <div>
                            <Link
                                to={`/createListing`}
                                className={
                                    view === `/user/${auth.id}`
                                        ? "main-selected"
                                        : "main-unselected"
                                }
                            >
                                create a listing
                            </Link>
                        </div>
                        </div>
                    ): null}
                    {auth.id ? (
                        <div style={{ marginBottom: ".15em" }}>
                            <div className="avatar">
                                <Link
                                    to={`/user/${auth.id}`}
                                    className={
                                        view === `/user/${auth.id}`
                                            ? "main-selected"
                                            : "main-unselected"
                                    }
                                >
                                    {auth.username}
                                </Link>
                            </div>
                        </div>
                    ) : null}

                    {auth.id ? (
                        ""
                    ) : (
                        <div
                            onClick={() => {
                                setStyle(displayLogin());
                                console.log(style, True);
                            }}
                            className={
                                view === "/login" ? "main-selected" : "main-unselected"
                            }
                            style={{ cursor: "pointer", marginBottom: ".1em" }}
                        >
                            <a>Login</a>
                        </div>
                    )}



                    {auth.id ? (
                        <button
                            id="logout-button"
                            onClick={() => {
                                dispatch(logout());
                                navigate("/");
                                setStyle(displayLogin());
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {auth.id ? "" : <Login style={style} />}
        </nav>
    );
};

export default NavBar;