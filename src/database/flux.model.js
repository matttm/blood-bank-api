module.exports= (sequelize, Sequelize) => {
    return sequelize.define("Flux", {
        fluxId: {
            field: 'FLUX_ID',
            type: Sequelize.UUID,
            primaryKey: true
        },
        fluxType: {
            field: 'FLUX_TYPE',
            type: Sequelize.STRING
        },
        patientId: {
            field: 'PATIENT_ID',
            type: Sequelize.UUID
        }
    }, {
        tableName: 'FLUX'
    });
};

