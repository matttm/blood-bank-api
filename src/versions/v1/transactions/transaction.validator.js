const genericValidator = require("../../../shared/validators/generic.validator");
const { transactionTypeCds } = require("../../../enums/transaction-type.enum");
const { bloodTypeCds } = require("../../../enums/blood-type.enum");

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
  function isValidTransactionPatch(safeObject) {
    let validity;
    // validity = genericValidator.isModelExistent(model, id);
    // if (!validity.isValid) {
    //     const err ='Error: donor id does not exist';
    //     console.error(err);
    //     return validity;
    // }
    validity = genericValidator.areSomeFieldsNonNull(fields, { ...patch });
    if (!validity.isValid) {
      const err = "Error: no non-null field was provided";
      console.error(err);
      return validity;
    }
    // TODO think bout this
    if (patch.bloodType && !bloodTypeCds.includes(patch.bloodType)) {
      const err = "Error: unknown blood type was provided";
      console.error(err);
      validity.isValid = false;
      validity.validityError = err;
      return validity;
    }
    validity = genericValidator.containsUniqueField(
      fields,
      { ...patch },
      { ...donor }
    );
    if (!validity.isValid) {
      const err = "Error: all patch fields are up to date";
      console.error(err);
      return validity;
    }
    return validity;
  }
  return Object.freeze({
    isValidTransactionCreation,
    isValidTransactionPatch,
  });
}

module.exports = TransactionValidator();
