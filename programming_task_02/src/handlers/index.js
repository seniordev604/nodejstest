const Counter = require("./counter");
const Newest = require("./newest");

// Define your other custom handlers here (if any)

function handle(action, actionData) {
  switch (action.handler) {
    case "COUNTER":
      return Counter.handle(actionData);
    case "NEWEST":
      return Newest.handle(...actionData);
    default:
      throw new Error(`Handler "${action.handler}" is not defined.`);
  }
}

module.exports = { handle };