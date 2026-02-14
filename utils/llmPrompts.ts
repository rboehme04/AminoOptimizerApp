type RecommendedLebensmittel = {
  id: string | number;
  name: string;
};

type RecipeIngredient = {
  id: string;
  title: string;
  portion: string;
  calories?: string;
};

type RecipeData = {
  title: string;
  ingredients: RecipeIngredient[];
  instructions?: string;
};

type CreatePromptParams = {
  recommendedLebensmittel: RecommendedLebensmittel[];
  recipe: RecipeData;
  numberFoodOutput?: number;
  dietaryPattern?: string;
  allergiesExclusions?: string;
};

/**
 * Creates a prompt for LLM based on recommended Lebensmittel and current recipe
 * @param recommendedLebensmittel - Array of recommended food items from the database query
 * @param recipe - Current recipe data including title, ingredients, and optional instructions
 * @returns Generated prompt string
 */
export const createPrompt = ({
  recommendedLebensmittel,
  recipe,
  numberFoodOutput = 16,
  dietaryPattern,
  allergiesExclusions,
}: CreatePromptParams): string => {
  // Format recommended Lebensmittel list
  const lebensmittelList = recommendedLebensmittel
    .map((item, index) => `${item.id}. ${item.name}`)
    .join("\n");

  // Format recipe ingredients with amounts
  const ingredientsList = recipe.ingredients
    .map(
      ing =>
        `- ${ing.title}: ${ing.portion}${ing.calories ? ` (${ing.calories})` : ""}`
    )
    .join("\n");

  // Build the prompt
  const generatedPrompt = `You are a professional nutritionist and recipe developer specialized in creating recipes with excellent taste and texture. Your task is to optimize a given recipe using recommended foods.
  
Rules:
1. Select exactly ${numberFoodOutput} foods from the 'RECOMMENDED FOODS' list that fit the flavor, improve or maintain texture, and realistically work in the recipe. Prefer whole, minimally processed foods over highly processed foods. Exclude foods that clearly do not fit (e.g., meat/fish in sweet recipes).
2. For each selected food, create one recipe variant. The food must be added to the recipe. Adjust other ingredient quantities as needed to maintain taste, consistency, and balance.
3. Recipes must be practical, enjoyable, and not overly thick, chalky, gritty, or watery. Avoid extreme protein overload.
4. Comply with the dietary pattern specified in 'DIETARY PATTERN'. Exclude foods that violate this pattern (e.g., no meat in vegan recipes, no meat/fish in vegetarian recipes).
5. Exclude all foods listed in the 'ALLERGIES & EXCLUSIONS' variable, including derived ingredients and related categories (e.g., nut allergy excludes all nuts and nut-based products).

OUTPUT:
Return exactly a JSON array with ${numberFoodOutput} objects. Each object must have this structure:

{
  "variant": "[Food Name from the 'RECOMMENDED FOODS' list]",
  "id": "[Food id from the 'RECOMMENDED FOODS' list exactly]",
  "recipe": {
    "title": "Recipe Title",
    "ingredients": [
      {"name": "Ingredient Name", "grams": 0, "calories": 0}
    ]
  }
}

Constraints:
- All ${numberFoodOutput} foods must be unique. Do not include duplicates.
- The "id" field must match exactly the id of a food from the 'RECOMMENDED FOODS' list. Do not invent or modify ids.
- Do not include extra text, numbering, or explanations. Only output valid JSON.

BASE RECIPE:
Titel: ${recipe.title}

INGREDIENTS:
${ingredientsList}
${recipe.instructions ? '\nPREPARATION:\n${recipe.instructions}' : ""}

DIETARY PATTERN:
${dietaryPattern || "None specified"}

ALLERGIES & EXCLUSIONS:
${allergiesExclusions || "None specified"}

RECOMMENDED FOODS:
${lebensmittelList}
`
;

  return generatedPrompt;
};

export type {
  CreatePromptParams, RecipeData, RecipeIngredient, RecommendedLebensmittel
};

