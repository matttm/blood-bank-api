const express = require('express');
const v1 = require('./versions/v1/v1.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', v1);

app.get('/', (req, res) => {
    return res.json({ time: Date.now() });
})
module.exports = app;
