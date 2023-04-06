function ModelService() {
    const isModelExistent = async (model, key, id) => {
        const entity = model.count({
            where: { [key]: id }
        });
        return !!entity;
    };
    return Object.freeze({
        isModelExistent
    });
}

module .exports = ModelService();
