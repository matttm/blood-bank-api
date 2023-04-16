const createApp = require('./app');
(async () => {
    console.info('Creating app');
    const app = await createApp();
    app.listen(3000, () => console.info(`Listening on: 3000`));
})();
