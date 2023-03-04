module.exports= (sequelize, Sequelize) => {
    return sequelize.define("donor", {
        donorId: {
            type: Sequelize.Number
        },
        firstName: {
            type: Sequelize.String
        },
        lastName: {
            type: Sequelize.String
        },
        bloodType: {
            type: Sequelize.String
        },
    });
};

