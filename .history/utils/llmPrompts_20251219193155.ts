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
}: CreatePromptParams): string => {
  // Format recommended Lebensmittel list
  const lebensmittelList = recommendedLebensmittel
    .map((item, index) => `${index + 1}. ${item.name}`)
    .join("\n");

  // Format recipe ingredients with amounts
  const ingredientsList = recipe.ingredients
    .map(
      ing =>
        `- ${ing.title}: ${ing.portion}${ing.calories ? ` (${ing.calories})` : ""}`
    )
    .join("\n");

  // Build the prompt
  const generatedPrompt = `Du bist ein Ernährungsexperte für die Optimierung von Rezepten basierend auf dem Aminosäureprofil.

Aktuelles Rezept:
Titel: ${recipe.title}

Zutaten:
${ingredientsList}
${recipe.instructions ? `\nZubereitung:\n${recipe.instructions}` : ""}

Empfohlene Lebensmittel zur Optimierung:
${lebensmittelList}

Bitte analysiere das aktuelle Rezept und die empfohlenen Lebensmittel. Erkläre, wie die empfohlenen Lebensmittel das Aminosäureprofil des Rezepts verbessern können und welche Lebensmittel am besten geeignet sind, um das Rezept zu optimieren.


You are a professional nutritionist and recipe developer specialized in high-protein, plant-based recipes with excellent taste and texture.

INPUT:
You will receive:
1) A base recipe including a title and a list of ingredients with gram amounts and calories.
2) A list of recommended foods that may be used for optimization.

TASK:
Optimize the given recipe under the following rules:

1) Food Selection:
- Select exactly 12 foods from the recommended foods list.
- Choose only foods that fit the flavor profile, improve or maintain texture, and realistically work in the recipe.
- Exclude foods that clearly do not fit (e.g. meat or fish in sweet vegan recipes).

2) Recipe Variants:
- For each selected food, create one optimized recipe variant.
- The selected food may either be added to the recipe or replace an existing ingredient.
- Adjust the remaining ingredient quantities as needed to preserve good taste, maintain a pleasant consistency (e.g. creamy or drinkable), and avoid overpowering protein or artificial flavors.

3) Quality Constraints:
- Each recipe must be enjoyable, balanced, and practical to prepare.
- Avoid overly thick, chalky, watery, or artificial textures.
- Do not use extreme protein loading that harms taste or consistency.

OUTPUT FORMAT (STRICT):
For each variant, output the following structure:

Variant X – [Selected Food Name]
- Short reason why this food fits
- Optimized recipe:
  - Title
  - Ingredients with gram amounts
- Short notes on:
  - texture
  - flavor profile
  - nutritional improvement

ADDITIONAL RULES:
- Do not duplicate variants.
- Use clear, concise, non-marketing language.
- Prefer plant-based options when reasonable.
- Focus on real-world usability.

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

