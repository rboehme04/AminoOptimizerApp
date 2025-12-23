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
  imageUri?: string | null;
};

export type RecipeRow = {
  id: number;
  title: string;
  instructions: string | null;
  ingredients_json: string;
  nutrition_json: string | null;
  image_uri: string | null;
  created_at: number;
  is_favorite: number; // SQLite stores booleans as 0/1
  is_optimized: number;
  favorited_at: number | null; // Timestamp when recipe was favorited
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
      image_uri TEXT,
      created_at INTEGER NOT NULL,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      is_optimized INTEGER NOT NULL DEFAULT 0,
      favorited_at INTEGER
    );
  `);
  
  // Add favorited_at column to existing databases (if it doesn't exist)
  // This is safe to run multiple times - SQLite will ignore if column already exists
  try {
    await db.execAsync(`
      ALTER TABLE recipes ADD COLUMN favorited_at INTEGER;
    `);
  } catch (error) {
    // Column already exists, ignore error
    // SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN
  }
};

export const insertRecipe = async (
  recipe: RecipeInsert,
  nutrition?: Record<string, number>,
  isOptimized: boolean = false
): Promise<number> => {
  const db = await dbPromise;
  const ingredientsJson = JSON.stringify(recipe.ingredients ?? []);
  const nutritionJson = nutrition ? JSON.stringify(nutrition) : null;
  const createdAt = Date.now();

  const result = await db.runAsync(
    "INSERT INTO recipes (title, instructions, ingredients_json, nutrition_json, image_uri, created_at, is_favorite, is_optimized) VALUES (?, ?, ?, ?, ?, ?, 0, ?);",
    [
      recipe.title,
      recipe.instructions,
      ingredientsJson,
      nutritionJson,
      recipe.imageUri ?? null,
      createdAt,
      isOptimized ? 1 : 0,
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
      "SELECT id, title, instructions, ingredients_json, nutrition_json, image_uri, created_at, is_favorite, is_optimized, favorited_at FROM recipes ORDER BY created_at DESC;"
    );
    return rows;
  };

export const getRecipeById = async (id: number): Promise<RecipeRow | null> => {
  const db = await dbPromise;
  const rows = await db.getAllAsync<RecipeRow>(
    "SELECT id, title, instructions, ingredients_json, nutrition_json, image_uri, created_at, is_favorite, is_optimized, favorited_at FROM recipes WHERE id = ?;",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

/**
 * Updates nutrition data for an existing recipe
 */
export const updateRecipeNutrition = async (
  id: number,
  nutrition: Record<string, number>
): Promise<void> => {
  const db = await dbPromise;
  const nutritionJson = JSON.stringify(nutrition);
  await db.runAsync(
    "UPDATE recipes SET nutrition_json = ? WHERE id = ?;",
    [nutritionJson, id]
  );
};

/**
 * Updates an existing recipe
 */
export const updateRecipe = async (
  id: number,
  recipe: RecipeInsert,
  nutrition?: Record<string, number>
): Promise<void> => {
  const db = await dbPromise;
  const ingredientsJson = JSON.stringify(recipe.ingredients ?? []);
  const nutritionJson = nutrition ? JSON.stringify(nutrition) : null;

  await db.runAsync(
    "UPDATE recipes SET title = ?, instructions = ?, ingredients_json = ?, nutrition_json = ?, image_uri = ? WHERE id = ?;",
    [
      recipe.title,
      recipe.instructions,
      ingredientsJson,
      nutritionJson,
      recipe.imageUri ?? null,
      id,
    ]
  );
};

/**
 * Deletes a recipe by ID
 */
export const deleteRecipe = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.runAsync("DELETE FROM recipes WHERE id = ?;", [id]);
};

/**
 * Gets all favorite recipes ordered by favorited_at date (descending, most recently favorited first)
 */
export const getFavoriteRecipes = async (): Promise<RecipeRow[]> => {
  const db = await dbPromise;
  const rows = await db.getAllAsync<RecipeRow>(
    "SELECT id, title, instructions, ingredients_json, nutrition_json, image_uri, created_at, is_favorite, is_optimized, favorited_at FROM recipes WHERE is_favorite = 1 ORDER BY favorited_at DESC, created_at DESC;"
  );
  return rows;
};

/**
 * Checks if a recipe is marked as favorite
 */
export const isRecipeFavorite = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const rows = await db.getAllAsync<{ is_favorite: number }>(
    "SELECT is_favorite FROM recipes WHERE id = ?;",
    [id]
  );
  return rows.length > 0 && rows[0].is_favorite === 1;
};

/**
 * Toggles the favorite status of a recipe
 * Sets favorited_at timestamp when favoriting, clears it when unfavoriting
 */
export const toggleRecipeFavorite = async (
  id: number,
  isFavorite: boolean
): Promise<void> => {
  const db = await dbPromise;
  if (isFavorite) {
    // When favoriting, set the favorited_at timestamp to current time
    await db.runAsync(
      "UPDATE recipes SET is_favorite = ?, favorited_at = ? WHERE id = ?;",
      [1, Date.now(), id]
    );
  } else {
    // When unfavoriting, clear the favorited_at timestamp
    await db.runAsync(
      "UPDATE recipes SET is_favorite = ?, favorited_at = NULL WHERE id = ?;",
      [0, id]
    );
  }
};

/**
 * Sets a recipe as favorite
 */
export const setRecipeFavorite = async (
  id: number,
  isFavorite: boolean
): Promise<void> => {
  await toggleRecipeFavorite(id, isFavorite);
};

export const getDatabase = async () => dbPromise;


