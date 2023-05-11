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

