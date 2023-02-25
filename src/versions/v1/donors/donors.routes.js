const { Router } = require('express')
const donorsController = require('./donors.controller');

const donorsRouter = Router();

donorsRouter.get(
    '/',
    donorsController.getDonors
);

module.exports = donorsRouter;
