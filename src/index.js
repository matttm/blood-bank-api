const app = require('app');
const serverless = require('serverless-http');

const handler = serverless(app, { provider: 'aws' });
module.exports.handler = async (context, req) => {
    context.res = await handler(context, req);
}
