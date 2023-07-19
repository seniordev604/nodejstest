const authorize = require("./src/authorize");
const calculate = require("./src/calculate");
const { DynamoDB } = require("aws-sdk");

const dbClient = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "eu-west-1",
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

async function handler(event) {
  try {
    // Call the authorization function to check if the user is authorized to perform the action
    const authResponse = await authorize(event);

    if (authResponse.statusCode !== 200) {
      // If the user is not authorized, return the authorization response
      return authResponse;
    }

    // If the user is authorized, proceed with calculating the result
    const { Headers, body } = event;
    const { actionid: actionId } = JSON.parse(body);

    const actions = await dbClient.scan({ TableName: "actions" }).promise();

    const handlers = {
      COUNTER: require("./handlers/counter"),
      NEWEST: require("./handlers/newest"),
    };

    const result = calculate(actionId, actions.Items, handlers);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
}

module.exports = { handler };