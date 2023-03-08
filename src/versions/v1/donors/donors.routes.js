const { Router } = require('express')
const donorsController = require('./donors.controller');
const {getDonor} = require("./donors.controller");

const donorsRouter = Router();

donorsRouter.route('/')
    .get(donorsController.getDonors)
    .post(donorsController.createDonor);

donorsRouter.route('/:donor-id')
    .get(getDonor);

module.exports = donorsRouter;
