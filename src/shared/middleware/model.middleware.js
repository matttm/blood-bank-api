const modelService = require('../services/model.service');

function isModelExistentMiddleware(model, key) {
    return async function (req, res, next) {
        const { id } = req.params;
        if (await modelService.isModelExistent(model, key, id)) {
            next();
        } else {
            console.error(`Error: id of ${id} does not exist`);
            return res.status(404).send();
        }
    };
}

module.exports = {
    isModelExistentMiddleware
};
