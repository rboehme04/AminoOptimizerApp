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
  numberF
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
  numberFoodOutput
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
  const generatedPrompt = `You are a professional nutritionist and recipe developer specialized in high-protein, plant-based recipes with excellent taste and texture. Your task is to optimize a given recipe using recommended foods.

Rules:

1. Select exactly 4 foods from the recommended foods list that fit the flavor, improve or maintain texture, and realistically work in the recipe. Exclude foods that clearly do not fit (e.g., meat/fish in sweet vegan recipes).
2. For each selected food, create one recipe variant. The food must be added. Adjust other ingredient quantities to maintain taste, consistency, and balance.
3. Recipes must be practical, enjoyable, and not overly thick, chalky, or watery. Avoid extreme protein overload.

OUTPUT:
Return exactly a JSON array with 12 objects. Each object must have this structure:

{
"variant": "[Food Name]",
"id": "[Food id]",
"recipe": {
"title": "Recipe Title",
"ingredients": [
{"name": "Ingredient Name", "grams": 0, "calories": 0}
]
}

**Constraints:**
- All 12 foods must be unique. Do not include duplicates.
- Do not include extra text, numbering, or explanations. Only output valid JSON.

BASE RECIPE:
[INSERT BASE RECIPE HERE]

RECOMMENDED FOODS:
[INSERT RECOMMENDED FOODS LIST HERE]

BASE RECIPE:
Titel: ${recipe.title}

Zutaten:
${ingredientsList}
${recipe.instructions ? `\nZubereitung:\n${recipe.instructions}` : ""}

RECOMMENDED FOODS:
${lebensmittelList}
`;

  return generatedPrompt;
};

export type {
    CreatePromptParams, RecipeData, RecipeIngredient, RecommendedLebensmittel
};

