module.exports= (sequelize, Sequelize) => {
    return sequelize.define("FluxType", {
        fluxTypeId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        fluxTypeDesc: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'FLUX_TYPE'
    });
};

