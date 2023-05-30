const genericValidator = require("../../../shared/validators/generic.validator");
const { transactionTypeCds } = require("../../../enums/transaction-type.enum");
const { bloodTypeCds } = require("../../../enums/blood-type.enum");
const modelService = require("../../../shared/services/model.service");

function TransactionValidator() {
  const fields = ["transactionType", "bloodAmountML", "donorId"];
  // the following function determines if a given userId exists
  const doesDonorExist = modelService.isModelExistentCurry("Donor", "donorId");
  function isValidTransactionCreation(data) {
    let validity;
    // following checks that all fields are provided
    validity = genericValidator.areAllFieldsNonNull(fields, { ...data });
    if (!validity.isValid) {
      console.error(
        "Error: a required param for a transaction was not provided"
      );
      return validity;
    }
    validity = doesDonorExist(data.donorId);
    if (!validity.isValid) {
      console.error(validity.validityError);
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
  function isValidTransactionPatch(current, safeObject) {
    let validity;
    validity = genericValidator.areSomeFieldsNonNull(fields, { ...patch });
    if (!validity.isValid) {
      const err = "Error: no non-null field was provided";
      console.error(err);
      return validity;
    }
    if (safeObject.donorId) {
      validity = doesDonorExist(safeObject.donorId);
      if (!validity.isValid) {
        console.error(validity.validityError);
        return validity;
      }
    }
    // if this field is provided, check it's validity
    if (
      data.transactionType &&
      !transactionTypeCds.includes(data.transactionType)
    ) {
      console.error("Error: unknown transaction type was provided");
      validity.isValid = false;
      validity.validityError = "Error: unknown transaction type was provided";
      return validity;
    }
    // this checks for if the new object contains a change
    validity = genericValidator.containsUniqueField(
      fields,
      { ...current },
      { ...safeObject }
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
