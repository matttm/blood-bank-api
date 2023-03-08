module.exports= (sequelize, Sequelize) => {
    return sequelize.define("BloodType", {
        bloodTypeId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        bloodTypeDesc: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'BLOOD_TYPE'
    });
};

