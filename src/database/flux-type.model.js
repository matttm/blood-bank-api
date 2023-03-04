module.exports= (sequelize, Sequelize) => {
    return sequelize.define("fluxType", {
        fluxTypeId: {
            type: Sequelize.String
        },
        fluxTypeDesc: {
            type: Sequelize.String
        }
    });
};

