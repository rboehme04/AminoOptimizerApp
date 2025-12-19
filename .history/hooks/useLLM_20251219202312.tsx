import { generateTextViaSupabase, type ChatMessage } from "@/utils/huggingfaceSupabase";
import { useCallback, useState } from "react";

type UseLLMReturn = {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  callLLM: (prompt: string, systemPrompt?: string) => Promise<void>;
  reset: () => void;
};

/**
 * Hook to call Hugging Face Llama 3.1 8B via Supabase Edge Function
 * 
 * This keeps your API key secure on the server side.
 * 
 * Setup:
 * 1. Follow the guide in utils/SUPABASE_SETUP_INSTRUCTIONS.md
 * 2. Deploy the Supabase Edge Function
 * 3. Set the HF_TOKEN secret in Supabase
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
      // Build messages array for chat format
      const messages: ChatMessage[] = [];

      if (systemPrompt) {
        messages.push({
          role: "system",
          content: systemPrompt,
        });
      }

      messages.push({
        role: "user",
        content: prompt,
      });

      // Call Hugging Face API via Supabase Edge Function
      // The API key is stored securely in Supabase secrets
      const generatedText = await generateTextViaSupabase(messages, {
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
