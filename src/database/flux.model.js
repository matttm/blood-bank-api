module.exports= (sequelize, Sequelize) => {
    return sequelize.define("Transaction", {
        transactionId: {
            field: 'TRANSACTION_ID',
            type: Sequelize.UUID,
            primaryKey: true
        },
        transactionType: {
            field: 'TRANSACTION_TYPE',
            type: Sequelize.STRING
        },
        patientId: {
            field: 'PATIENT_ID',
            type: Sequelize.UUID
        }
    }, {
        tableName: 'TRANSACTION'
    });
};

