import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type DraftIngredient = {
  id: string;
  title: string;
  portion: string;
  calories?: string;
};

type RecipeDraftState = {
  title: string;
  instructions: string;
  ingredients: DraftIngredient[];
};

type RecipeDraftActions = {
  setTitle: (value: string) => void;
  setInstructions: (value: string) => void;
  addIngredient: (ingredient: DraftIngredient) => void;
  updateIngredient: (ingredient: DraftIngredient) => void;
  removeIngredient: (ingredientId: string) => void;
  reset: () => void;
};

const defaultState: RecipeDraftState = {
  title: "",
  instructions: "",
  ingredients: [],
};

const RecipeDraftStateContext = createContext<RecipeDraftState | undefined>(
  undefined
);
const RecipeDraftActionsContext = createContext<RecipeDraftActions | undefined>(
  undefined
);

export const RecipeDraftProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<RecipeDraftState>(defaultState);

  const actions = useMemo<RecipeDraftActions>(
    () => ({
      setTitle: value =>
        setState(prev => ({
          ...prev,
          title: value,
        })),
      setInstructions: value =>
        setState(prev => ({
          ...prev,
          instructions: value,
        })),
      addIngredient: ingredient =>
        setState(prev => ({
          ...prev,
          ingredients: [...prev.ingredients, ingredient],
        })),
      updateIngredient: ingredient =>
        setState(prev => ({
          ...prev,
          ingredients: prev.ingredients.map(existing =>
            existing.id === ingredient.id ? ingredient : existing
          ),
        })),
      removeIngredient: ingredientId =>
        setState(prev => ({
          ...prev,
          ingredients: prev.ingredients.filter(
            ingredient => ingredient.id !== ingredientId
          ),
        })),
      reset: () => setState(defaultState),
    }),
    []
  );

  return (
    <RecipeDraftStateContext.Provider value={state}>
      <RecipeDraftActionsContext.Provider value={actions}>
        {children}
      </RecipeDraftActionsContext.Provider>
    </RecipeDraftStateContext.Provider>
  );
};

export const useRecipeDraft = (): RecipeDraftState => {
  const ctx = useContext(RecipeDraftStateContext);
  if (!ctx) {
    throw new Error("useRecipeDraft must be used within RecipeDraftProvider");
  }
  return ctx;
};

export const useRecipeDraftActions = (): RecipeDraftActions => {
  const ctx = useContext(RecipeDraftActionsContext);
  if (!ctx) {
    throw new Error(
      "useRecipeDraftActions must be used within RecipeDraftProvider"
    );
  }
  return ctx;
};

export type { DraftIngredient, RecipeDraftState };
