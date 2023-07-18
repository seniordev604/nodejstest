import express from "express";
import { DB } from "./utils/db";
import { recipeQueryParser } from "./utils/requestParsers";

const app = express();
const recipeDb = new DB("indexDb");

const RECIPE_TABLE_NAME = "recipes";

app.use(express.json());

app.get("/recipes", async (req, res) => {
  const recipeQuery = recipeQueryParser(req.query as Record<string, string>);

  const recipes = await recipeDb.query(RECIPE_TABLE_NAME, recipeQuery);

  res.status(200).send(recipes);
});

app.post("/recipes", async (req, res) => {
  const recipe = await recipeDb.add(RECIPE_TABLE_NAME, req.body);

  res.send(201).send(recipe);
});

app.listen(3000);
