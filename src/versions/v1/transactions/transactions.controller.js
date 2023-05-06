const transactionService = require("./transactions.service");

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
  return Promise.resolve();
}

async function createTransaction(req, res) {
  return Promise.resolve();
}

async function updateTransaction(req, res) {
  return Promise.resolve();
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
};
