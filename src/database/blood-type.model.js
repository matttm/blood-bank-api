module.exports= (sequelize, Sequelize) => {
    return sequelize.define("bloodType", {
        bloodTypeId: {
            type: Sequelize.String
        },
        bloodTypeDesc: {
            type: Sequelize.String
        }
    });
};

