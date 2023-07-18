const fs = require("fs/promises");
const express = require("express");
const _ = require("lodash");

const userFile = "users.json";

const app = express();

app.get("/users", async (req, res) => {
  const users = getAllUsers();
  res.send(JSON.stringify(users));
});

app.post("/users", async (req, res) => {
  const { first_name, last_name } = req.body || {};
  if (!last_name || !first_name) {
    res.send("Incorrect input");
  } else {
    await addNewUser({ first_name, last_name });
    res.send("Added user");
  }
});

app.get("/tiers/:tier/users", async (req, res) => {
  const { tier } = req.query;

  const users = await getAllUsers().filter((user) => user.tier === tier);

  await users.map(async (user) => {
    await sendNotification(user);
  });

  res.send("Notifications sent.");
});

app.get("/tiers/stats", async (req, res) => {
  const users = await getAllUsers();

  const stats = _.reduce(users, (acc, user) => {
    return { [user.tier]: acc[user.tier] + 1, ...acc }
  })

  res.send(stats);
});

app.listen(3000);

const getAllUsers = async () => {
  const fileData = (await fs.readFile(userFile)).toString();

  return { users: JSON.parse(fileData) };
};

const addNewUser = async (user) => {
  const fileData = (await fs.readFile(userFile)).toString();

  const userData = JSON.parse(fileData);

  const id = userData[userData.length].id + 1;
  userData.push({ ...user, tier: "A" });

  await fs.writeFile(userFile, JSON.stringify(userData));
};

const sendNotification = async (user) => {
  console.log(user);
};
