const express = require('express');
const app = express.Router();
const { Listing } = require('../db');

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
    const listing = await Listing.create(req.body);
    res.send(listing);
  } catch (ex) {
    next(ex);
  }
});

