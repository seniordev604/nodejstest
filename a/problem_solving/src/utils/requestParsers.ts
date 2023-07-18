import { Recipe } from "../types/recipe";

export function recipeQueryParser(query: Record<string, string>) {
  const parsedQuery: Partial<Recipe> = {};

  if (query.time) {
    parsedQuery.time = Number(query.time);
  }

  return parsedQuery as Recipe;
}
