const { Router } = require("express");
const donorsRouter = require("./donors/donors.routes");
const transactionsRouter = require("./transactions/transactions.route");

const v1 = Router();

v1.use("/donors", donorsRouter);

v1.use("/transactions", transactionsRouter);

module.exports = v1;
