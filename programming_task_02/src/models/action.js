const { dbClient, TableNames } = require("../common/db");
const Handler = require("../handlers/index");
const Role = require("./role");

class Action {
  id;
  parentActionId;
  role;
  handler;

  constructor(input) {
    this.id = input.id;
    this.parentActionId = input.parentActionId;
    this.role = Role.from(input.role);
    this.handler = Handler.from(input.handler);
  }

  static async getById(id) {
    const res = (await dbClient.get({ TableName: TableNames.actions, Key: { pk: id } }).promise())
      .Item;

    if (!res) {
      throw new Error("Action does not exist");
    }

    return new Action(res);
  }

  async getParentAction() {
    const res = (
      await dbClient.get({ TableName: TableNames.actions, Key: { pk: this.parentActionId } }).promise()
    ).Item;

    if (!res) {
      throw new Error("Parent Action does not exist");
    }

    return new Action(res);
  }

  async getChildActions() {
    const res = (
      await dbClient
        .query({
          TableName: TableNames.actions,
          IndexName: "parent-index",
          KeyConditionExpression: "parentActionId = :parentId",
          ExpressionAttributeValues: {
            ":parentId": this.id,
          },
        })
        .promise()
    ).Items;

    if (!res) {
      throw new Error("No child Actions found");
    }

    return res.map((item) => new Action(item));
  }
}

module.exports = Action;