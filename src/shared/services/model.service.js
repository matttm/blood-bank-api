function ModelService() {
    const isModelExistent = async (model, key, id) => {
        try {
            const entity = model.count({
                where: {[key]: id}
            });
            return !!entity;
        } catch (e) {
            const error = 'Error in is existent call';
            console.error(error);
            throw e;
        }
    };
    return Object.freeze({
        isModelExistent
    });
}

module .exports = ModelService();
