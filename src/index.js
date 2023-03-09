
const awsServerlessExpress = require('@vendia/serverless-express');
const createApp = require('./app');

let serverlessExpressInstance;

async function setup (event, context) {
    const app = await createApp();
    console.log(asyncValue);
    serverlessExpressInstance = awsServerlessExpress({ app })
    return serverlessExpressInstance(event, context)
}

function handler (event, context) {
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

    return setup(event, context)
}

exports.handler = handler;
