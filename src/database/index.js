const dbConfig = require("../../db.config");
const fs = require('fs');
const Sequelize = require("sequelize");

function createDbInstance() {
    return new Promise((res, rej) => {
        const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect
        });

        const db = {};

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        fs.readdir('./src/database', (err, files) => {
            if (err) {
                console.error('Error: ', err);
                rej(err);
            }
            files = files.filter((f) => !f.includes('index'));
            for (let file of files) {
                console.log(`Loading model ${file}`);
                const model = file.split('.')[0];
                db[model] = require(`./${model}.model`)(sequelize, Sequelize);
            }
            res(db);
        });
    });
}

module.exports = createDbInstance;
