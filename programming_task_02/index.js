const { dbClient, TableNames } = require("./common/db");
const User = require("./model/user");
const Action = require("./model/action");
const Handler = require("./handlers/index");

async function handler(event) {
  try {
    const { userid, actionid } = JSON.parse(event.body);

    const action = await Action.getById(actionid);

    const user = await User.getById(userid);

    if (!isUserAuthorized(user, action)) {
      return { statusCode: 403, body: { message: "Unauthorized" } };
    }

    let result;
    switch (action.handler) {
      case Handler.COUNTER:
        result = await Handler.handleCounter(actionid);
        break;
      case Handler.NEWEST:
        result = await Handler.handleNewest(actionid);
        break;
      default:
        return { statusCode: 400, body: { message: "Invalid handler" } };
    }

    return { statusCode: 200, body: result };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: { message: "Internal server error" } };
  }
}

function isUserAuthorized(user, action) {
  return user.role === action.role || user.role === Role.SYS_ADMIN;
}

module.exports = { handler };