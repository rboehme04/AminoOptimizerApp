import AsyncStorage from "@react-native-async-storage/async-storage";

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
  return loadList<RecentRecipeItem>(RECENT_RECIPES_KEY);
}

export async function getRecentLebensmittel(): Promise<RecentLebensmittelItem[]> {
  return loadList<RecentLebensmittelItem>(RECENT_LEBENS_KEY);
}


