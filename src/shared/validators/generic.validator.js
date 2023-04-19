function GenericValidator() {
  const containsNewField = (fields, object) => {
    const validity = { isValid: true, validityError: "" };
    if (fields.map((key) => object[key]).filter(Boolean).length === 0) {
      const err = "Error: no new field was provided";
      console.error(err);
      validity.isValid = false;
      validity.validityError = err;
    }
    return validity;
  };
  /**
   * @descriptionThis is used for validation of a PATCH. It ensures the object
   * has an actual update.
   *
   * @param {*} fields list of fields to check
   * @param {*} o1
   * @param {*} o2
   * @returns
   */
  const containsUniqueField = (fields, o1, o2) => {
    const validity = { isValid: true, validityError: "" };
    if (
      fields.filter((key) => !o1[key] || o1[key] === o2[key]).length ===
      fields.length
    ) {
      const err = "Error: all patch fields are up to date";
      console.error(err);
      validity.isValid = false;
      validity.validityError = err;
    }
    return validity;
  };
  /**
   * @description function for verifying POST calls. This ensures every
   * field in field list is in non-falsy property in object
   *
   * @param {@} fields a list of the required fields
   * @param {*} object object being validated
   * @returns { isValid: Boolean, validityError: string }
   */
  const areAllFieldsNonNull = (fields, object) => {
    const validity = { isValid: true, validityError: "" };
    if (fields.filter((key) => !object[key]).length) {
      const err = "Error: object contains a null required field";
      console.error(err);
      validity.isValid = false;
      validity.validityError = err;
    }
    return validity;
  };
  return Object.freeze({
    containsNewField,
    containsUniqueField,
    areAllFieldsNonNull,
  });
}

module.exports = new GenericValidator();
