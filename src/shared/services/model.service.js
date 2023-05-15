function ModelService() {
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
