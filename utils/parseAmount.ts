/**
 * Parses an amount string like "30g", "30 g", "1 kg", etc. into amount and unit.
 * @param amountStr - The amount string to parse (e.g., "30g", "100 g", "1 kg")
 * @returns An object with amount and unit, or null if parsing fails
 */
export const parseAmount = (
  amountStr: string
): { amount: number; unit: "g" | "kg" } | null => {
  const trimmed = amountStr.trim();
  // Match patterns like "30g", "30 g", "1kg", "1 kg", "0.5 kg", etc.
  const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(g|kg)?$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unitStr = match[2]?.toLowerCase();

  if (isNaN(value) || value <= 0) return null;

  // Default to "g" if no unit specified, or if value is < 1000 and unit is "g" or missing
  if (!unitStr || unitStr === "g") {
    return { amount: value, unit: "g" };
  }
  if (unitStr === "kg") {
    return { amount: value, unit: "kg" };
  }

  return null;
};

