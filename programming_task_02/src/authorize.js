const { dbClient, TableNames } = require("../common/db");

class AuthorizeHandler {
  static async handle(eventBody, userId) {
    const { actionid } = JSON.parse(eventBody);

    const user = await AuthorizeHandler.getUserById(userId);
    const action = await AuthorizeHandler.getActionById(actionid);

    if (!AuthorizeHandler.isActionAllowed(action, user.role)) {
      return { statusCode: 403, body: JSON.stringify({ message: "Action not allowed." }) };
    }

    const actionData = await AuthorizeHandler.getActionData(actionid);
    const handler = action.handler;

    try {
      const { result } = await handler.handle(actionData);
      return { statusCode: 200, body: JSON.stringify({ result }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ message: "Internal server error" }) };
    }
  }

  static async getUserById(userId) {
    const response = await dbClient.get({ TableName: TableNames.users, Key: { pk: userId } }).promise();
    if (!response.Item) {
      throw new Error("User not found.");
    }
    return response.Item;
  }

  static async getActionById(actionId) {
    const response = await dbClient.get({ TableName: TableNames.actions, Key: { pk: actionId } }).promise();
    if (!response.Item) {
      throw new Error("Action not found.");
    }
    return response.Item;
  }

  static async getActionData(actionId) {
    const response = await dbClient.query({
      TableName: TableNames.actions,
      IndexName: "parent-index",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": actionId },
    }).promise();

    if (!response.Items) {
      throw new Error("Action data not found.");
    }

    return response.Items;
  }

  static isActionAllowed(action, userRole) {
    const { role } = action;

    if (role === userRole || role === "sysadmin") {
      return true;
    }

    if (role === "localadmin" && (userRole === "sysadmin" || userRole === "localadmin")) {
      return true;
    }

    return false;
  }
}

module.exports = AuthorizeHandler;