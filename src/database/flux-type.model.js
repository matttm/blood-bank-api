module.exports= (sequelize, Sequelize) => {
    return sequelize.define("fluxType", {
        fluxTypeId: {
            type: Sequelize.STRING
        },
        fluxTypeDesc: {
            type: Sequelize.STRING
        }
    });
};

