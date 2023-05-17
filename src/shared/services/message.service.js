const AWS = require("@aws-sdk/client-sqs");
const { SendMessageCommand } = require("@aws-sdk/client-sqs");
const utilityService = require("./utility.service");
const { eventTypeEnum } = require("../../enums/event-type.enum");

function MessageService() {
  // Create an SQS service object
  const sqs = new AWS.SQSClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.SQS_ACCESS_KEY,
      secretAccessKey: process.env.SQS_SECRET_KEY,
    },
  });
  const getDedupeId = (eventTypeCd, payload) => {
    if (payload?.id) {
      return `${eventTypeCd}-${payload.id}`;
    }
    if (!["string", "number"].includes(typeof payload)) {
      return Object.values(payload).reduce((acc, cur, idx, arr) => {
        return acc === ""
          ? cur
          : acc.concat("-").concat(getDedupeId(eventTypeCd, cur));
      }, "");
    } else {
      return String(payload);
    }
  };
  const constructMessage = (eventTypeCd, payload) => {
    // if there is an id in the payload, it will be dedupe id,
    // if not, combine all payload fields
    const dedupeId = getDedupeId(eventTypeCd, payload);
    return {
      MessageAttributes: {
        Event: {
          DataType: "String",
          StringValue: eventTypeCd,
        },
      },
      MessageBody: {
        cd: eventTypeCd,
        ...payload,
      },
      MessageDeduplicationId: dedupeId,
      MessageGroupId: eventTypeCd,
    };
  };
  const sendMessage = (options) => {
    const requiredFields = [
      "MessageAttributes",
      "MessageBody",
      "MessageDeduplicationId",
      "MessageGroupId",
    ];
    // check whether all required fields exist
    if (
      requiredFields.map((field) => options[field]).filter(Boolean).length <
      requiredFields.length
    ) {
      console.error("Error: Missing a required message field");
      throw "Error: Missing a required message field";
    }
    try {
      const params = {
        MessageAttributes: {
          ...utilityService.deepCopy(options.MessageAttributes),
          Timestamp: {
            DataType: "String",
            StringValue: Date.now().toString(),
          },
        },
        MessageBody: JSON.stringify({
          ...utilityService.deepCopy(options.MessageBody),
        }),
        MessageDeduplicationId: options.MessageDeduplicationId,
        MessageGroupId: options.MessageGroupId,
        QueueUrl: process.env.SQS_QUEUE_URL,
      };
      console.log(`Sending message to queue ${JSON.stringify(params)}`);
      const command = new SendMessageCommand(params);
      return sqs.send(command);
    } catch (e) {
      console.error(`Error: ${e}`);
      throw e;
    }
  };
  return Object.freeze({
    constructMessage,
    sendMessage,
  });
}

module.exports = new MessageService();
