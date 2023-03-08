module.exports= (sequelize, Sequelize) => {
    return sequelize.define("bloodType", {
        bloodTypeId: {
            type: Sequelize.STRING
        },
        bloodTypeDesc: {
            type: Sequelize.STRING
        }
    });
};

