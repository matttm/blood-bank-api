const AWS = require("@aws-sdk/client-sqs");
const {SendMessageCommand} = require("@aws-sdk/client-sqs");
const utilityService = require('./utility.service');
const {eventTypeEnum} = require("../enums/event-type.enum");


function MessageService() {
    // Create an SQS service object
    const sqs = new AWS.SQSClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.SQS_ACCESS_KEY,
            secretAccessKey: process.env.SQS_SECRET_KEY
        }
    });
    const sendMessage = (options) => {
        const requiredFields = [
            'MessageAttributes',
            'MessageBody',
            'MessageDeduplicationId',
            'MessageGroupId'
        ];
        // check whether all required fields exist
        if (requiredFields.map((field) => options[field]).filter(Boolean).length < requiredFields.length) {
            console.error('Error: Missing a required message field');
            throw ('Error: Missing a required message field');
        }
        try {
            const params = {
                MessageAttributes: {
                    ...utilityService.deepCopy(options.MessageAttributes),
                    "Timestamp": {
                        DataType: "String",
                        StringValue: Date.now(),toString()
                    }
                },
                MessageBody: JSON.stringify({ ...utilityService.deepCopy(options.MessageBody) }),
                MessageDeduplicationId: options.MessageDeduplicationId,
                MessageGroupId: options.MessageGroupId,
                QueueUrl: process.env.SQS_QUEUE_URL
            };
            console.log(`Sending message to queue ${JSON.stringify(params)}`);
            const command = new SendMessageCommand(params);
            return sqs.send(command);
        } catch (e) {
            console.error(`Error: ${e}`);
            throw e;
        }
    }
    return Object.freeze({
        sendMessage
    });
}

module.exports = new MessageService();
