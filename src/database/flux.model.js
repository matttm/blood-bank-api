module.exports= (sequelize, Sequelize) => {
    return sequelize.define("Flux", {
        fluxId: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        fluxType: {
            type: Sequelize.STRING
        },
        patientId: {
            type: Sequelize.UUID
        }
    }, {
        tableName: 'FLUX'
    });
};

