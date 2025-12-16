import { Router } from "expo-router";

type NavigateParams = {
  id: string | number;
  portionText?: string;
};

/**
 * Generic navigation helper to open either recipe or Lebensmittel detail screens.
 * Passes through the current portion text when available so the detail screen can prefill it.
 */
export const navigateToDetailWithPortion = (
  router: Router,
  { id, portionText }: NavigateParams
) => {
  const isRecipe = String(id).startsWith("recipe:");
  const rawId = isRecipe ? String(id).replace("recipe:", "") : String(id);

  const pathname = isRecipe ? "/HinzuRezDetail" : "/HinzuLebDetail";
  const params: Record<string, string> = { id: rawId };

  if (portionText) {
    params.portion = portionText;
  }

  router.push({ pathname, params });
};

