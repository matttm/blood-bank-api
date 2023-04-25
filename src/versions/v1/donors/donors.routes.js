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
const modelExistentMiddleware = isModelExistentMiddleware(
  models["Donor"],
  "donorId"
);
donorsRouter
  .route("/:id")
  .get(modelExistentMiddleware, donorsController.getDonor)
  .patch(modelExistentMiddleware, donorsController.updateDonor)
  .delete(modelExistentMiddleware, donorsController.deleteDonor);

module.exports = donorsRouter;
