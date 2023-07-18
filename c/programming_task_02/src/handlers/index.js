const Counter = require("./counter");

export class Handler {
  static from(input) {
    if (input.rule === "COUNTER") return Counter;
  }
}
