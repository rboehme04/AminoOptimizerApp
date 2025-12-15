import * as SQLite from "expo-sqlite";

export type RecipeInsert = {
  title: string;
  instructions: string;
  ingredients: Array<{
    id: string;
    title: string;
    portion: string;
    calories?: string;
  }>;
};

const DB_NAME = "aminooptimizer.db";

const db = await SQLite.openDatabase(DB_NAME);

export const initDatabase = (): Promise<void> =>
  new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            title TEXT NOT NULL,
            instructions TEXT,
            ingredients_json TEXT NOT NULL,
            created_at INTEGER NOT NULL
          );`
        );
      },
      error => reject(error),
      () => resolve()
    );
  });

export const insertRecipe = (recipe: RecipeInsert): Promise<number> =>
  new Promise((resolve, reject) => {
    const ingredientsJson = JSON.stringify(recipe.ingredients ?? []);
    const createdAt = Date.now();

    db.transaction(
      tx => {
        tx.executeSql(
          "INSERT INTO recipes (title, instructions, ingredients_json, created_at) VALUES (?, ?, ?, ?);",
          [recipe.title, recipe.instructions, ingredientsJson, createdAt],
          (_, result) => {
            const insertedId =
              typeof result.insertId === "number"
                ? result.insertId
                : Number(result.insertId);
            resolve(insertedId);
          }
        );
      },
      error => reject(error)
    );
  });

export const getDatabase = () => db;


