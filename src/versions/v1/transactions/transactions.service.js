const models = require("../../../database");

function TransactionsService() {
  const transaction = "Transaction";
  async function getTransactions() {
    try {
      return models[transaction].findAll();
    } catch (e) {
      console.error(e);
      throw new Error("Error occurred while getting all transactions");
    }
  }
  async function getTransaction(id) {
    try {
      return models[transaction].find({
        where: {
          transactionId: id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error("Error occurred while getting a transaction");
    }
  }
  async function createTransaction() {
    try {
      return models[transaction].findAll();
    } catch (e) {
      console.error(e);
      throw new Error("Error occoured while getting all transactions");
    }
  }
  async function updateTransaction() {
    try {
      return models[transaction].findAll();
    } catch (e) {
      console.error(e);
      throw new Error("Error occoured while getting all transactions");
    }
  }
  return Object.freeze({
    getTransactions,
    getTransaction,
  });
}

module.exports = TransactionsService();
