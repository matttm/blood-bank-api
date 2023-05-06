const models = require("../../../database");

function TransactionsService() {
  async function getTransactions() {}
  return Object.freeze({
    getTransactions,
  });
}

module.exports = TransactionsService();
