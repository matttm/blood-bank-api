module.exports= (sequelize, Sequelize) => {
    return sequelize.define("donor", {
        fluxId: {
            type: Sequelize.Number
        },
        fluxType: {
            type: Sequelize.String
        },
        patientId: {
            type: Sequelize.Number
        }
    });
};

