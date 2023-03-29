const { Router } = require('express')
const donorsController = require('./donors.controller');

const donorsRouter = Router();

donorsRouter.route('/')
    .get(donorsController.getDonors)
    .post(donorsController.createDonor);

donorsRouter.route('/:id')
    .get(donorsController.getDonor)
    .patch(donorsController.updateDonor)
    .delete(donorsController.deleteDonor);

module.exports = donorsRouter;
