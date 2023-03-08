module.exports= (sequelize, Sequelize) => {
    return sequelize.define("FluxType", {
        fluxTypeId: {
            type: Sequelize.STRING
        },
        fluxTypeDesc: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'FLUX_TYPE'
    });
};

