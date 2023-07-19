const authorize = require("./src/authorize.js");
const calculate = require("./src/calculate.js");
const actionsData = require("./data/actions.json");
const handlers = {
  newest: require("./src/handlers/newest.js"),
  counter: require("./src/handlers/counter.js"),
};
// The event argument passed here:
// {Headers: {userid: string}, body: string} - parsed body contains {actionid: string}

exports.handler = async function (event) {
  const { Headers, body } = event;
  const { userid } = Headers;
  const { actionid } = JSON.parse(body);

  const userRole = "SYS_ADMIN"; // Replace this with actual user role fetched from your authentication system
  const requestedAction = actionsData.find(action => action.id === actionid);

  if (!authorize.isAuthorized(userRole, requestedAction.role)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }

  // TODO: Implement calculation logic
  const result = calculate(actionid, actionsData, handlers);

  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
  return;
};



