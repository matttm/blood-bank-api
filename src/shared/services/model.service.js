function ModelService() {
  /**
   * The following curried function can be used to determine whether an id
   * exists in a specified table, so it can be used in a validator
   *
   * @param model a sequelize obj
   * @param key the property containing the id
   * @param id the actual id in question
   * @return {Promise<boolean>}
   */
  const isModelExistent = async (model, key, id) => {
    try {
      const entity = await model.count({
        where: { [key]: +id },
      });
      return !!entity;
    } catch (e) {
      const error = "Error in is existent call";
      console.error(error, e);
      throw e;
    }
  };
  /**
   * The following curried function can be used to determine whether an id
   * exists in a specified table, so it can be used in a validator
   *
   * @param model a sequelize obj
   * @param key the property containing the id
   * @return {function(*): {validityError: string, isValid: boolean}}
   */
  const isModelExistentCurry = (model, key) => {
    return (id) => {
      const validity = { isValid: true, validityError: "" };
      const isExists = isModelExistent(model, key, id);
      if (!isExists) {
        validity.isValid = false;
        validity.validityError = `Error: ${model}[${key}] does not exist`;
      }
      return validity;
    };
  };
  return Object.freeze({
    isModelExistent,
    isModelExistentCurry,
  });
}

module.exports = ModelService();
