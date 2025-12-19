import {
  generateText,
  validateApiKey,
  type ChatMessage,
} from "@/utils/huggingface";
import { useCallback, useState } from "react";

type UseLLMReturn = {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  callLLM: (prompt: string, systemPrompt?: string) => Promise<void>;
  reset: () => void;
};

/**
 * Gets the Hugging Face API key from environment variables
 * @returns API key or null if not set
 */
const getHuggingFaceApiKey = (): string | null => {
  // Use EXPO_PUBLIC_ prefix for environment variables in Expo
  const apiKey = process.env.H;
  return apiKey || null;
};

/**
 * Hook to call Hugging Face Llama 3.1 8B via the Inference API
 *
 * Setup:
 * 1. Get your Hugging Face API token from https://huggingface.co/settings/tokens
 * 2. Make sure you have access to Meta-Llama-3.1-8B-Instruct (accept terms at https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
 * 3. Add EXPO_PUBLIC_HUGGINGFACE_API_KEY to your .env file or environment variables
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
      const apiKey = getHuggingFaceApiKey();

      if (!apiKey) {
        throw new Error(
          "Hugging Face API key not found. Please set EXPO_PUBLIC_HUGGINGFACE_API_KEY in your environment variables."
        );
      }

      if (!validateApiKey(apiKey)) {
        throw new Error(
          "Invalid Hugging Face API key format. API keys should start with 'hf_'."
        );
      }

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

      // Call Hugging Face Inference API
      const generatedText = await generateText(
        messages,
        { apiKey },
        {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.9,
        }
      );

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
