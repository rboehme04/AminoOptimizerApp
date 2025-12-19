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



`;

  return generatedPrompt;
};

export type {
    CreatePromptParams, RecipeData, RecipeIngredient, RecommendedLebensmittel
};

