import { useLocalSearchParams } from "expo-router";
import RecipeFormScreen from "@/components/RecipeFormScreen";

export default function EditRecipeScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const recipeId = params.id ? parseInt(params.id, 10) : undefined;

  if (recipeId && isNaN(recipeId)) {
    return null;
  }

  return <RecipeFormScreen recipeId={recipeId} />;
}
