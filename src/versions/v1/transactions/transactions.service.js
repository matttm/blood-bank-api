const models = require("../../../database");
const messageService = require("../../../shared/services/message.service");
const { eventTypeEnum } = require("../../../enums/event-type.enum");
const transactionValidator = require("./transaction.validator");

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
      const validity = transactionValidator.isValidTransactionCreation({
        firstName,
        lastName,
        bloodType,
      });
      if (!validity.isValid) {
        return { success: false, error: validity.validityError };
      }
      const params = messageService.constructMessage(
        eventTypeEnum.NewTransaction.code,
        {
          transaction: {
            transactionId,
            transactionType,
            bloodAmountML,
            donorId,
          },
        }
      );
      const data = await messageService.sendMessage(params);
      return { success: !!data };
    } catch (e) {
      console.error(e);
      throw new Error("Error occurred while getting all transactions");
    }
  }
  async function updateTransaction() {
    try {
      const params = messageService.constructMessage(
        eventTypeEnum.EditTransaction.code,
        {
          transaction: {},
        }
      );
      const data = await messageService.sendMessage(params);
      return { success: !!data };
    } catch (e) {
      console.error(e);
      throw new Error("Error occurred while getting all transactions");
    }
  }
  return Object.freeze({
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
  });
}

module.exports = TransactionsService();
