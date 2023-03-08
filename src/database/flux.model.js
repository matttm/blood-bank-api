module.exports= (sequelize, Sequelize) => {
    return sequelize.define("donor", {
        fluxId: {
            type: Sequelize.UUID
        },
        fluxType: {
            type: Sequelize.STRING
        },
        patientId: {
            type: Sequelize.UUID
        }
    });
};

