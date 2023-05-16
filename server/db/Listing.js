const Sequelize = require('sequelize');
const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, INTEGER, DECIMAL, ENUM, DATEONLY} = Sequelize;



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
    street: {
        type: STRING,
    },
    city: {
        type: STRING,
    },
    state: {
        type: STRING,
    },
    country: {
        type: STRING,
    },
    zipCode: {
        type: STRING,
        validate: {
            is: /^[0-9]{5}(?:-[0-9]{4})?$/
        }
    },
    lat: {
        type: DECIMAL,
    },
    long: {
        type: DECIMAL,
    },
    photo: {
        type: TEXT,
    },
    tenantId: {
        type: STRING,
    },
    bookingStatus: {
        type: ENUM("OCCUPIED", "AVAILABLE"),
        defaultValue: "AVAILABLE",
    },
    expiry_date: {
        type: DATEONLY,
    }
});

Listing.addHook('beforeValidate',(listing) => {
    if (listing.photo === ''){
        listing.photo = null;
    }
})


module.exports = Listing;