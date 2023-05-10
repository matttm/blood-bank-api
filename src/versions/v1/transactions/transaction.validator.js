const genericValidator = require("../../../shared/validators/generic.validator");
const { transactionTypeCds } = require("../../../enums/transaction-type.enum");

function TransactionValidator() {
  const fields = ["transactionType", "bloodAmountML", "donorId"];
  function isValidTransactionCreation(data) {
    let validity;
    validity = genericValidator.areAllFieldsNonNull(fields, { ...data });
    if (!validity.isValid) {
      console.error(
        "Error: a required param for a transaction was not provided"
      );
      return validity;
    }
    if (!transactionTypeCds.includes(data.transactionType)) {
      console.error("Error: unknown transaction type was provided");
      validity.isValid = false;
      validity.validityError = "Error: unknown transaction type was provided";
      return validity;
    }
    return validity;
  }
  return Object.freeze({
    isValidTransactionCreation,
  });
}

module.exports = TransactionValidator();
