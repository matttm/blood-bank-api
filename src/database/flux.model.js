module.exports= (sequelize, Sequelize) => {
    return sequelize.define("Flux", {
        fluxId: {
            type: Sequelize.UUID
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

