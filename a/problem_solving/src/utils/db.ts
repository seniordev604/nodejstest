import { reduce } from "lodash";
import { Database } from "sqlite3";
import { Recipe } from "../types/recipe";
import { generateId } from "./id";

export class DB {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }

  async query<T>(tableName: string, filters: Record<string, unknown>): Promise<Array<T>> {
    const sql = reduce(
      filters,
      (acc, value, key) => ({
        statements: [...acc.statements, key + " = $" + key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { statements: [], params: {} },
    );

    const sqlQuery =
      "select * from " + tableName + " where " + sql.statements.join(" and ");

    const results: Promise<Array<T>> = new Promise((res, rej) => {
      this.db.all(sqlQuery, sql.params, (error, rows) => {
        if (error) rej(error);
        else res(rows);
      });
    });

    return await results;
  }

  async add(tableName: string, input: Recipe): Promise<Recipe> {
    const sql = reduce(
      { id: generateId(), createdDate: new Date().toISOString(), ...input },
      (acc, value, key) => ({
        columns: [...acc.columns, key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { columns: [], params: {} },
    );

    const sqlQuery =
      "insert into " +
      tableName +
      " (" +
      sql.columns.join(", ") +
      " )" +
      "values (" +
      sql.columns.map((c) => `$${c}`).join(", ") +
      " )";

    const result = new Promise((res, rej) => {
      this.db.run(sqlQuery, sql.params, (error, rows) => {
        if (error) rej(error);
        else res(rows);
      });
    });

    console.log(await result);

    return (await result) as Recipe;
  }
}
