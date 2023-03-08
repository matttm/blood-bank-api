module.exports= (sequelize, Sequelize) => {
    return sequelize.define("Donor", {
        donorId: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        bloodType: {
            type: Sequelize.STRING
        },
    }, {
        tableName: 'DONOR'
    });
};

