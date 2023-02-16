const {Router} = require("express");
const bloodBank = require('src/versions/v1/routes/blood-bank.routes');

const v1 = new Router();

v1.use('blood-bank', bloodBank);

module.exports = v1;
