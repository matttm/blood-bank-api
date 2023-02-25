const {Router} = require("express");
const bloodBank = require('./blood-bank/blood-bank.routes');
const donors = require('./donors/donors.routes');

const v1 = Router();

v1.use('/blood-bank', bloodBank);
v1.use('/donors', donors);

module.exports = v1;
