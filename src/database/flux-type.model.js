module.exports= (sequelize, Sequelize) => {
    return sequelize.define("FluxType", {
        fluxTypeId: {
            field: 'FLUX_TYPE_ID',
            type: Sequelize.STRING,
            primaryKey: true
        },
        fluxTypeDesc: {
            field: 'FLUX_TYPE_DESC',
            type: Sequelize.STRING
        }
    }, {
        tableName: 'FLUX_TYPE'
    });
};

