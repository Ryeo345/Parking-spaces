const Sequelize = require('sequelize');
const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, INTEGER, DECIMAL} = Sequelize;



const Listing = conn.define('listing', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
    },
    monthly_price: {
        type: INTEGER,
    },
    storage_type: {
        type: STRING,
    },
    summary: {
        type: TEXT,
    },
    length: {
        type: INTEGER,
    },
    width: {
        type: INTEGER,
    },
    city: {
        type: STRING,
    },
    state: {
        type: STRING,
    },
    lat: {
        type: DECIMAL,
    },
    long: {
        type: DECIMAL,
    },
    photo: {
        type: TEXT,
    }
});

Listing.addHook('beforeValidate',(listing) => {
    if (listing.photo === ''){
        listing.photo = null;
    }
})


module.exports = Listing;