const CounterHandler = require("./counter");
const NewestHandler = require("./newest");
const AuthorizeHandler = require("./authorize");

class Handler {
  static from(handlerName) {
    switch (handlerName) {
      case "COUNTER":
        return CounterHandler;
      case "NEWEST":
        return NewestHandler;
      case "AUTHORIZE":
        return AuthorizeHandler;
      default:
        throw new Error(`Handler "${handlerName}" is not defined.`);
    }
  }
}

module.exports = Handler;