const { Router } = require("express");
const donorsController = require("./donors.controller");
const models = require("../../../database");
const {
  isModelExistentMiddleware,
} = require("../../../shared/middleware/model.middleware");

const donorsRouter = Router();

donorsRouter
  .route("/")
  .get(donorsController.getDonors)
  .post(donorsController.createDonor);

// id specific routes are below
console.log("mymod", models);
donorsRouter
  .use(isModelExistentMiddleware(models["Donor"], "donorId"))
  .route("/:id")
  .get(donorsController.getDonor)
  .patch(donorsController.updateDonor)
  .delete(donorsController.deleteDonor);

module.exports = donorsRouter;
