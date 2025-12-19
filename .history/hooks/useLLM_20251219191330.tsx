import { useCallback, useState } from "react";

type UseLLMReturn = {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  callLLM: (prompt: string) => Promise<void>;
  reset: () => void;
};

/**
 * Hook to call an LLM API with a given prompt
 * @returns Object containing response, loading state, error, and callLLM function
 */
export const useLLM = (): UseLLMReturn => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callLLM = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // TODO: Replace with your actual LLM API endpoint
      // Example structure for OpenAI API:
      // const response = await fetch("https://api.openai.com/v1/chat/completions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${YOUR_API_KEY}`,
      //   },
      //   body: JSON.stringify({
      //     model: "gpt-4",
      //     messages: [{ role: "user", content: prompt }],
      //   }),
      // });
      // const data = await response.json();
      // setResponse(data.choices[0].message.content);

      // Placeholder for now - replace with actual API call
      throw new Error("LLM API call not yet implemented");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error calling LLM:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    response,
    isLoading,
    error,
    callLLM,
    reset,
  };
};
