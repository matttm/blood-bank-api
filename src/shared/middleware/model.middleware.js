const modelService = require("../services/model.service");

function isModelExistentMiddleware(model, key) {
  return async function (req, res, next) {
    try {
      const { id } = req.params;
      console.log("in mw");
      if (await modelService.isModelExistent(model, key, id)) {
        console.log("in true case");
        next();
      } else {
        console.info(`Error: id of ${id} does not exist`);
        return res.status(404).send();
      }
    } catch (e) {
      const error = "Error in is existent middleware";
      console.error(error);
      return res.status(500).send(error);
    }
  };
}

module.exports = {
  isModelExistentMiddleware,
};
