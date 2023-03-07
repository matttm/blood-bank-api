const express = require('express');
const v1 = require('./versions/v1/v1.routes');
const createDbInstance = require('./database');

async function createApp() {
    const app = express();
    const instance = await createDbInstance();

    try {
        await instance.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api/v1', v1);

    app.get('/', (req, res) => {
        return res.json({ time: Date.now() });
    });
    return app;
}
module.exports = createApp;
