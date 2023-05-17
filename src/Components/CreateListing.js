import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createListing } from "../store/listings";
import { TextField, Button, Input } from "@mui/material";
import { useNavigate} from "react-router-dom";

const CreateListing = () => {
  const { auth } = useSelector((state) => state);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [monthly_price, setMonthlyPrice] = useState("");
  const [storage_type, setStorageType] = useState("");
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      console.log(ev.target.files);
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setPhoto(reader.result);
      });
    });
  }, [ref]);
  const _createListing = async (ev) => {
    ev.preventDefault();
    const { id } = auth;
    await dispatch(
      createListing({ userId: id, street, city, state, country, zipCode , photo, name, width, length, summary, storage_type, monthly_price})
    );
    navigate('/');
  };

  return (
      <div className="creatingList">
        <div>
          <h1>Post a new Spot</h1></div>
        <div className="creatingList-form-container">
          <form onSubmit={_createListing}>
            <TextField
                required
                label="name"
                variant="outlined"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
            />
            <TextField
                required
                label="summary"
                variant="outlined"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
            />
            <TextField
                required
                label="length"
                variant="outlined"
                value={length}
                onChange={(ev) => setLength(ev.target.value === "" ? 0 : parseInt(ev.target.value))}
            />
            <TextField
                required
                label="width"
                variant="outlined"
                value={width}
                onChange={(ev) => setWidth(ev.target.value === "" ? 0 : parseInt(ev.target.value))}
            />
            <TextField
                required
                label="monthly price"
                variant="outlined"
                value={monthly_price}
                onChange={(ev) => setMonthlyPrice(ev.target.value === "" ? 0 : parseInt(ev.target.value))}
            />
            <TextField
                required
                label="storage type"
                variant="outlined"
                value={storage_type}
                onChange={(ev) => setStorageType(ev.target.value)}
            />
            <Input type="file" ref={ref} />
            {!!photo && (
                <img
                    src={photo}
                    style={{
                      width: "100px",
                      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                    }}
                />
            )}
            <TextField
                required
                label="Street Address"
                variant="outlined"
                value={street}
                onChange={(ev) => setStreet(ev.target.value)}
            />
            <TextField
                required
                label="City"
                variant="outlined"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
            />
            <TextField
                required
                label="State"
                variant="outlined"
                value={state}
                onChange={(ev) => setState(ev.target.value)}
            />
            <TextField
                required
                label="Country"
                variant="outlined"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
            />
            <TextField
                required
                label="Zip Code"
                variant="outlined"
                value={zipCode}
                onChange={(ev) => setZipCode(ev.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={!street || !city || !state || !country || !zipCode}
            >
              Create
            </Button>
          </form>
      </div>

    </div>
  );
};

export default CreateListing;
