const conn = require("./conn");
const User = require("./User");
const Listing = require("./Listing");
const path = require("path");
const fs = require("fs");

let root = path.dirname(path.dirname(__dirname));

const filePath = path.join(root, "static", "seedData.json");
const jsonData = fs.readFileSync(filePath, "utf-8");

const data = JSON.parse(jsonData);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const listingArr = [];
  data.listings.forEach((listing) => {
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
        })
      );
    }
  });

  await Promise.all(listingArr);
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Listing,
};
