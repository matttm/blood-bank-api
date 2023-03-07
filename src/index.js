
const awsServerlessExpress = require('aws-serverless-express');
const createApp = require('./app');
const binaryMimeTypes = [
    'application/octet-stream',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml'
];

module.exports.handler = async (event, context) => {
    const app = await createApp();
    const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
    return new Promise((resolve, reject) => {
        awsServerlessExpress.proxy(server, event, {
            ...context,
            succeed: process.env.IS_OFFLINE ? context.succeed : resolve,
        });
    });
}
