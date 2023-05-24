const transactionService = require("./transactions.service");
const utilityService = require("../../../shared/services/utility.service");

const fields = ["transactionType", "bloodAmountML", "donorId"];

async function getTransactions(req, res) {
  try {
    const transactions = await transactionService.getTransactions();
    return res.status(200).json(transactions);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error getting all transactions");
  }
}
async function getTransaction(req, res) {
  try {
    const { id } = req?.body;
    const transactions = await transactionService.getTransaction(id);
    return res.status(200).json(transactions);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error getting the transaction");
  }
}

async function createTransaction(req, res) {
  try {
    const safeObject = utilityService.cleanObject(fields, req?.body);
    const transactions = await transactionService.createTransaction(safeObject);
    return res.status(200).json(transactions);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error creating the transaction");
  }
}

async function updateTransaction(req, res) {
  try {
    const safeObject = utilityService.cleanObject(fields, req?.body);
    const transactions = await transactionService.updateTransaction(safeObject);
    return res.status(200).json(transactions);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error while updating the transaction");
  }
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
};
