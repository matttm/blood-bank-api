module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Donor",
    {
      donorId: {
        field: "DONOR_ID",
        type: Sequelize.UUID,
        primaryKey: true,
      },
      firstName: {
        field: "FIRST_NAME",
        type: Sequelize.STRING,
      },
      lastName: {
        field: "LAST_NAME",
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bloodType: {
        field: "BLOOD_TYPE",
        type: Sequelize.STRING,
      },
      createdAt: {
        type: "TIMESTAMP",
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        allowNull: false,
      },
    },
    {
      tableName: "DONOR",
    }
  );
};
