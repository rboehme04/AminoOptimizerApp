import { generateTextViaEdge, type ChatMessage } from "@/utils/huggingface";
import { useCallback, useState } from "react";

type UseLLMReturn = {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  callLLM: (prompt: string, systemPrompt?: string) => Promise<void>;
  reset: () => void;
};

/**
 * Hook to call Llama 3.1 8B via Supabase Edge Function (no API key in the app).
 *
 * The Hugging Face token is stored in Supabase secrets (HF_TOKEN).
 *
 * @returns Object containing response, loading state, error, and callLLM function
 */
export const useLLM = (): UseLLMReturn => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callLLM = useCallback(async (prompt: string, systemPrompt?: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const messages: ChatMessage[] = [];
      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }
      messages.push({ role: "user", content: prompt });

      const generatedText = await generateTextViaEdge(messages, {
        max_new_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      });

      setResponse(generatedText);
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
