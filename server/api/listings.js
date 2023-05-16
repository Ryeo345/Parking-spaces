const express = require('express');
const app = express.Router();
const { Listing } = require('../db');
const secrets = require("../../secrets.js");
const apiKey = secrets.API_KEY;
const axios = require('axios');

module.exports = app;


app.get('/', async(req, res, next)=> {
  try {
    res.send(await Listing.findAll());
  }
  catch(ex){
    next(ex);
  }
});
app.post("/", async (req, res, next) => {
  try {
    let {street, city, state, country} = req.body;
    street = street.trim().replace(/\s+/g, "%20");
    city = city.trim().replace(/\s+/g, "%20");
    state = state.trim().replace(/\s+/g, "%20");
    country = country.trim().replace(/\s+/g, "%20");

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}%20${city}%20${state}%20${country}&key=${apiKey}`);
    console.log('anchor');
    req.body.lat = response.data.results[0].geometry.location.lat;
    req.body.long = response.data.results[0].geometry.location.lng;

    const listing = await Listing.create(req.body);
    res.send(listing);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

app.put("/:id", async(req, res, next) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    res.send(await listing.update(req.body));
  }
  catch (err) {
    next(err);
  }
})

app.delete("/:id", async(req, res, next) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    await listing.destroy();
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
})

