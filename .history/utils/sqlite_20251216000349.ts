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

export type RecipeRow = {
  id: number;
  title: string;
  instructions: string | null;
  ingredients_json: string;
  nutrition_json: string | null;
  created_at: number;
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
      nutrition_json TEXT,
      created_at INTEGER NOT NULL
    );
  `);
  
  // Add nutrition_json column to existing tables (migration)
  try {
    await db.execAsync(`
      ALTER TABLE recipes ADD COLUMN nutrition_json TEXT;
    `);
  } catch (error) {
    // Column might already exist, ignore error
  }
};

export const insertRecipe = async (
  recipe: RecipeInsert,
  nutrition?: Record<string, number>
): Promise<number> => {
  const db = await dbPromise;
  const ingredientsJson = JSON.stringify(recipe.ingredients ?? []);
  const nutritionJson = nutrition ? JSON.stringify(nutrition) : null;
  const createdAt = Date.now();

  const result = await db.runAsync(
    "INSERT INTO recipes (title, instructions, ingredients_json, nutrition_json, created_at) VALUES (?, ?, ?, ?, ?);",
    [
      recipe.title,
      recipe.instructions,
      ingredientsJson,
      nutritionJson,
      createdAt,
    ]
  );

  const insertedId =
    typeof result.lastInsertRowId === "number"
      ? result.lastInsertRowId
      : Number(result.lastInsertRowId);

  return insertedId;
};

export const getAllRecipesOrderedByCreatedDesc =
  async (): Promise<RecipeRow[]> => {
    const db = await dbPromise;
    const rows = await db.getAllAsync<RecipeRow>(
      "SELECT id, title, instructions, ingredients_json, nutrition_json, created_at FROM recipes ORDER BY created_at DESC;"
    );
    return rows;
  };

export const getRecipeById = async (id: number): Promise<RecipeRow | null> => {
  const db = await dbPromise;
  const rows = await db.getAllAsync<RecipeRow>(
    "SELECT id, title, instructions, ingredients_json, created_at FROM recipes WHERE id = ?;",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const getDatabase = async () => dbPromise;


