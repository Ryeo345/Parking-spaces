import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { TextField } from "@mui/material";


const Login = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const logIn = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    style = { display: "none" };
    console.log(style);
    navigate("/");
  };
  return (
      <div style={style}>
        <div className="card">
          <h2>Login</h2>
          <div className="container">
            <form onSubmit={logIn}>
              <TextField
                  label="Username"
                  variant="outlined"
                  id="username"
                  name="username"
                  value={credentials.username}
                  style={{ marginBottom: ".75em" }}
                  onChange={onChange}
                  autoComplete="off"
              />

              <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  autoComplete="off"
              />
              <div id="login-button-container">
                <button id="login-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
