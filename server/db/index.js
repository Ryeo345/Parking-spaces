const conn = require("./conn");
const User = require("./User");
const Listing = require("./Listing");
const Booking = require("./Booking");
const path = require("path");
const fs = require("fs");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const secrets = require("../../secrets.js");
const apiKey = secrets.API_KEY;
const axios = require("axios");

let root = path.dirname(path.dirname(__dirname));

const filePath = path.join(root, "static", "seedData.json");
const jsonData = fs.readFileSync(filePath, "utf-8");

const data = JSON.parse(jsonData);

Listing.belongsTo(User);
User.hasMany(Listing);
User.hasMany(Booking);
Listing.hasMany(Booking);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

    const [moe, lucy, larry, ethyl] = await Promise.all([
        User.create({ username: "moe", password: "123" }),
        User.create({ username: "lucy", password: "123" }),
        User.create({ username: "larry", password: "123" }),
        User.create({ username: "ethyl", password: "123" }),
    ]);

    const getRandomUserId = () => {
        const randomIndex = Math.floor(Math.random() * [moe, lucy, larry, ethyl].length);
        return [moe, lucy, larry, ethyl][randomIndex].id;
    };

  const listingArr = [];
  data.listings.forEach((listing) => {
    let latlng = `${listing.latitude},${listing.longitude}`;
    let formattedAddress = {
      street: " ",
      city: " ",
      zipCode: " ",
      country: " ",
    };
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`
      )
      .then((response) => {
        let splitAddress =
          response.data.results[0].formatted_address.split(",");
        formattedAddress = {
          street: splitAddress[0],
          city: splitAddress[1],
          zipCode: splitAddress[2].split(" ")[2],
          country: splitAddress[3],
        };
        if (listing.monthly_price <= 200) {
          listingArr.push(
            Listing.create({
              name: listing.listing_name,
              monthly_price: listing.monthly_price,
              storage_type: listing.storage_type,
              summary: listing.summary,
              length: listing.length,
              width: listing.width,
              city: listing.city,
              state: listing.state,
              lat: listing.latitude,
              long: listing.longitude,
              photo: listing.photo,
              country: formattedAddress.country,
              zipCode: formattedAddress.zipCode,
              street: formattedAddress.street,
                userId: getRandomUserId(),
            })
          );
        }
      });
  });

  await Promise.all(listingArr);


  return {
    users: {
      moe,
      lucy,
      larry,
        ethyl,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Listing,
  Booking,
};
