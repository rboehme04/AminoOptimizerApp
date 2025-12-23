import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFavoriteRecipes as getFavoriteRecipesFromDB,
  isRecipeFavorite as isRecipeFavoriteInDB,
  toggleRecipeFavorite,
} from "./sqlite";
import { mapRecipeRowToItem } from "./recipeHelpers";

const FAVORITE_LEBENS_KEY = "favorite_lebensmittel_v1";

// Keep this type for backward compatibility with components that expect it
export type FavoriteRecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
  isOptimized: boolean;
};

export type FavoriteLebensmittelItem = {
  id: string | number;
  title: string;
  portion: string;
  calories: string;
};

async function loadFavorites<T>(key: string): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as T[];
  } catch (error) {
    console.error(`Error loading favorites for key ${key}`, error);
    return [];
  }
}

async function saveFavorites<T>(key: string, items: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error saving favorites for key ${key}`, error);
  }
}

export async function getFavoriteRecipes(): Promise<FavoriteRecipeItem[]> {
  // Get favorite recipes from SQLite (single source of truth)
  const favoriteRecipeRows = await getFavoriteRecipesFromDB();
  return favoriteRecipeRows.map(mapRecipeRowToItem);
}

export async function addFavoriteLebensmittel(
  item: FavoriteLebensmittelItem
): Promise<void> {
  const current = await loadFavorites<FavoriteLebensmittelItem>(
    FAVORITE_LEBENS_KEY
  );
  const exists = current.some(
    existing => String(existing.id) === String(item.id)
  );
  if (!exists) {
    // Add new item at the front instead of back
    await saveFavorites<FavoriteLebensmittelItem>(FAVORITE_LEBENS_KEY, [
      item,
      ...current,
    ]);
  }
}

export async function removeFavoriteLebensmittel(
  lebensmittelId: string | number
): Promise<void> {
  const current = await loadFavorites<FavoriteLebensmittelItem>(
    FAVORITE_LEBENS_KEY
  );
  const filtered = current.filter(
    item => String(item.id) !== String(lebensmittelId)
  );
  await saveFavorites<FavoriteLebensmittelItem>(FAVORITE_LEBENS_KEY, filtered);
}

export async function getFavoriteLebensmittel(): Promise<
  FavoriteLebensmittelItem[]
> {
  return loadFavorites<FavoriteLebensmittelItem>(FAVORITE_LEBENS_KEY);
}

export async function isLebensmittelFavorite(
  lebensmittelId: string | number
): Promise<boolean> {
  const favorites = await getFavoriteLebensmittel();
  return favorites.some(item => String(item.id) === String(lebensmittelId));
}

export async function addFavoriteRecipe(
  item: FavoriteRecipeItem
): Promise<void> {
  // Set recipe as favorite in SQLite (single source of truth)
  await toggleRecipeFavorite(item.id, true);
}

export async function removeFavoriteRecipe(
  recipeId: number
): Promise<void> {
  // Remove favorite status from SQLite (single source of truth)
  await toggleRecipeFavorite(recipeId, false);
}

export async function isRecipeFavorite(
  recipeId: number
): Promise<boolean> {
  // Check favorite status from SQLite (single source of truth)
  return await isRecipeFavoriteInDB(recipeId);
}

