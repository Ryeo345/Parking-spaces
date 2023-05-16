const Sequelize = require('sequelize');
const conn = require('./conn');
const {  UUID, UUIDV4, DATEONLY , ENUM} = Sequelize;

const Booking = conn.define('booking', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    renewalDate: {
        type: DATEONLY,
    },
    duration: {
        type: ENUM( "1-month", "6-month", "1-year"),
    }


});

module.exports = Booking;