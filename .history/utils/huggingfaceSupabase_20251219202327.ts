/**
 * Hugging Face API utilities using Supabase Edge Functions
 * This keeps your API key secure on the server side
 */

import { supabase } from "./supabase";
import { type ChatMessage } from "./huggingface";

export type HuggingFaceOptions = {
  max_new_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  repetition_penalty?: number;
  return_full_text?: boolean;
  model?: string;
};

/**
 * Calls the Hugging Face API via Supabase Edge Function
 * This keeps your API key secure on the server side
 * 
 * @param messages - Array of chat messages (system, user, assistant)
 * @param options - Optional generation parameters
 * @returns Generated text response
 */
export const generateTextViaSupabase = async (
  messages: ChatMessage[],
  options?: HuggingFaceOptions
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke("huggingface-proxy", {
      body: {
        messages,
        options: {
          max_new_tokens: options?.max_new_tokens ?? 512,
          temperature: options?.temperature ?? 0.7,
          top_p: options?.top_p ?? 0.9,
          top_k: options?.top_k ?? 50,
          repetition_penalty: options?.repetition_penalty ?? 1.1,
          return_full_text: options?.return_full_text ?? false,
          model: options?.model,
        },
      },
    });

    if (error) {
      throw new Error(`Supabase Edge Function error: ${error.message}`);
    }

    if (!data || typeof data !== "object") {
      throw new Error("Unexpected response format from Edge Function");
    }

    if ("error" in data) {
      throw new Error(
        typeof data.error === "string" ? data.error : "Error from Edge Function"
      );
    }

    if (typeof data.generated_text !== "string") {
      throw new Error("Missing generated_text in response");
    }

    return data.generated_text;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Unknown error occurred while calling Hugging Face API");
  }
};

// Re-export types for convenience
export type { ChatMessage } from "./huggingface";

