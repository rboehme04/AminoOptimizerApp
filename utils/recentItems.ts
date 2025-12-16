import AsyncStorage from "@react-native-async-storage/async-storage";

import { getRecipeById } from "@/utils/sqlite";

const RECENT_RECIPES_KEY = "recent_recipes_v1";
const RECENT_LEBENS_KEY = "recent_lebensmittel_v1";
const MAX_RECENT_ITEMS = 10;

export type RecentRecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
  isOptimized: boolean;
};

export type RecentLebensmittelItem = {
  id: string | number;
  title: string;
  portion: string;
  calories: string;
};

async function loadList<T>(key: string): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as T[];
  } catch (error) {
    console.error(`Error loading recent items for key ${key}`, error);
    return [];
  }
}

async function saveList<T>(key: string, items: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error saving recent items for key ${key}`, error);
  }
}

async function addToRecentList<T extends { id: string | number }>(
  key: string,
  item: T
): Promise<void> {
  const current = await loadList<T>(key);
  const filtered = current.filter(existing => existing.id !== item.id);
  const next = [item, ...filtered].slice(0, MAX_RECENT_ITEMS);
  await saveList<T>(key, next);
}

export async function addRecentRecipe(item: RecentRecipeItem): Promise<void> {
  await addToRecentList<RecentRecipeItem>(RECENT_RECIPES_KEY, item);
}

export async function addRecentLebensmittel(
  item: RecentLebensmittelItem
): Promise<void> {
  await addToRecentList<RecentLebensmittelItem>(RECENT_LEBENS_KEY, item);
}

export async function getRecentRecipes(): Promise<RecentRecipeItem[]> {
  const items = await loadList<RecentRecipeItem>(RECENT_RECIPES_KEY);

  if (items.length === 0) {
    return items;
  }

  // Drop recipes that have been deleted from the database
  const existingItems = (
    await Promise.all(
      items.map(async item => {
        const exists = await getRecipeById(Number(item.id));
        return exists ? item : null;
      })
    )
  ).filter(Boolean) as RecentRecipeItem[];

  if (existingItems.length !== items.length) {
    // Persist the cleaned list so deleted recipes do not reappear
    await saveList<RecentRecipeItem>(RECENT_RECIPES_KEY, existingItems);
  }

  return existingItems;
}

export async function getRecentLebensmittel(): Promise<RecentLebensmittelItem[]> {
  return loadList<RecentLebensmittelItem>(RECENT_LEBENS_KEY);
}


