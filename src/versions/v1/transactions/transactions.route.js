const { Router } = require("express");
const transactionsController = require("./transactions.controller");
const models = require("../../../database");
const {
  isModelExistentMiddleware,
} = require("../../../shared/middleware/model.middleware");

const transactionRouter = Router();

transactionRouter
  .route("/")
  .get(transactionsController.getTransactions)
  .post(transactionsController.createTransaction);

// id specific routes are below
const modelExistentMiddleware = isModelExistentMiddleware(
  models["Transaction"],
  "transactionId"
);
transactionRouter
  .route("/:id")
  .get(modelExistentMiddleware, transactionsController.getTransaction)
  .patch(modelExistentMiddleware, transactionsController.updateTransaction);

module.exports = transactionRouter;
