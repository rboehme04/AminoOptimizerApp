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

const dbPromise = SQLite.openDatabaseAsync(DB_NAME);

export const initDatabase = async (): Promise<void> => {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      instructions TEXT,
      ingredients_json TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
};

export const insertRecipe = async (recipe: RecipeInsert): Promise<number> => {
  const db = await dbPromise;
  const ingredientsJson = JSON.stringify(recipe.ingredients ?? []);
  const createdAt = Date.now();

  const result = await db.runAsync(
    "INSERT INTO recipes (title, instructions, ingredients_json, created_at) VALUES (?, ?, ?, ?);",
    [recipe.title, recipe.instructions, ingredientsJson, createdAt]
  );

  const insertedId =
    typeof result.lastInsertRowId === "number"
      ? result.lastInsertRowId
      : Number(result.lastInsertRowId);

  return insertedId;
};

export const getDatabase = async () => dbPromise;


