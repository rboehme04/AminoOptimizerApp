/**
 * Hugging Face API utilities for interacting with Meta Llama 3.1 8B
 * 
 * This TypeScript implementation provides similar functionality to the Python
 * huggingface_llama.py script, using the Hugging Face Inference API.
 * 
 * To use this:
 * 1. Get your Hugging Face API token from https://huggingface.co/settings/tokens
 * 2. Make sure you have access to Meta-Llama-3.1-8B-Instruct (accept terms at https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
 * 3. Store your token securely (e.g., in environment variables or secure storage)
 */

const HF_API_BASE = "https://api-inference.huggingface.co/models";
const MODEL_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type HuggingFaceConfig = {
  apiKey: string;
  model?: string; // Optional override for model name
};

/**
 * Formats messages into the chat template format expected by Llama 3.1 Instruct
 * This mimics the apply_chat_template functionality from the Python tokenizer
 * 
 * Format reference: https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct
 */
export const formatChatTemplate = (
  messages: ChatMessage[],
  addGenerationPrompt: boolean = true
): string => {
  // Llama 3.1 Instruct uses a specific format:
  // <|begin_of_text|><|start_header_id|>system<|end_header_id|>
  // 
  // {system_message}<|eot_id|>
  // <|start_header_id|>user<|end_header_id|>
  // 
  // {user_message}<|eot_id|>
  // <|start_header_id|>assistant<|end_header_id|>
  // 
  // {assistant_response}<|eot_id|>
  
  let prompt = "<|begin_of_text|>";
  
  for (const message of messages) {
    prompt += `<|start_header_id|>${message.role}<|end_header_id|>\n\n${message.content}<|eot_id|>\n`;
  }
  
  if (addGenerationPrompt) {
    prompt += "<|start_header_id|>assistant<|end_header_id|>\n\n";
  }
  
  return prompt;
};

/**
 * Calls the Hugging Face Inference API to generate text using Llama 3.1 8B
 * 
 * The Inference API supports two formats:
 * 1. Direct text input (using formatted prompt)
 * 2. Messages format (for chat models) - preferred for Instruct models
 * 
 * @param messages - Array of chat messages (system, user, assistant)
 * @param config - Configuration object with API key and optional model override
 * @param options - Optional generation parameters
 * @returns Generated text response
 */
export const generateText = async (
  messages: ChatMessage[],
  config: HuggingFaceConfig,
  options?: {
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    repetition_penalty?: number;
    return_full_text?: boolean;
  }
): Promise<string> => {
  const model = config.model || MODEL_NAME;
  const url = `${HF_API_BASE}/${model}`;

  // Format the prompt using chat template (required for Inference API)
  // The Inference API expects text input, not messages format
  const formattedPrompt = formatChatTemplate(messages, true);
  
  const requestBody = {
    inputs: formattedPrompt,
    parameters: {
      max_new_tokens: options?.max_new_tokens ?? 512,
      temperature: options?.temperature ?? 0.7,
      top_p: options?.top_p ?? 0.9,
      top_k: options?.top_k ?? 50,
      repetition_penalty: options?.repetition_penalty ?? 1.1,
      return_full_text: options?.return_full_text ?? false,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.error || errorMessage;
      
      // Handle model loading errors (first request may take time)
      if (errorJson.error?.includes("loading") || errorJson.estimated_time) {
        const waitTime = errorJson.estimated_time || 20;
        throw new Error(
          `Model is loading. Please wait ${waitTime} seconds and try again.`
        );
      }
    } catch (parseError) {
      // If JSON parsing fails, use the raw error text
      if (!(parseError instanceof Error && parseError.message.includes("Model is loading"))) {
        errorMessage = errorText || errorMessage;
      } else {
        throw parseError;
      }
    }
    
    throw new Error(`Hugging Face API error: ${errorMessage}`);
  }

  const data = await response.json();
  
  // Handle different response formats
  if (Array.isArray(data) && data.length > 0) {
    return data[0].generated_text || "";
  }
  
  if (typeof data === "object" && "generated_text" in data) {
    return data.generated_text || "";
  }
  
  throw new Error("Unexpected response format from Hugging Face API");
};

/**
 * Tokenizes text using the Hugging Face Inference API
 * Note: This requires a separate tokenizer endpoint or you can use a client-side tokenizer
 * For now, this is a placeholder that estimates token count
 * 
 * @param text - Text to tokenize
 * @param config - Configuration object with API key
 * @returns Array of token IDs
 */
export const tokenize = async (
  text: string,
  config: HuggingFaceConfig
): Promise<number[]> => {
  // Note: Hugging Face Inference API doesn't have a direct tokenization endpoint
  // For production, you might want to:
  // 1. Use @xenova/transformers for client-side tokenization
  // 2. Create a backend service that uses the Python tokenizer
  // 3. Estimate tokens (rough approximation: ~4 characters per token)
  
  // This is a rough estimation - for accurate tokenization, use a proper tokenizer
  const estimatedTokens = Math.ceil(text.length / 4);
  
  // Return a placeholder array - in production, use actual tokenization
  return Array.from({ length: estimatedTokens }, (_, i) => i);
};

/**
 * Decodes token IDs back to text
 * Note: This is a placeholder - for production, use a proper tokenizer
 */
export const decode = async (
  tokens: number[],
  config: HuggingFaceConfig
): Promise<string> => {
  // Placeholder - in production, use actual tokenizer decode
  throw new Error("Decode not implemented - use a proper tokenizer library");
};

/**
 * Gets token count for a given text
 * This is an estimation - for accurate counts, use proper tokenization
 */
export const getTokenCount = (text: string): number => {
  // Rough estimation: ~4 characters per token for English text
  // This is approximate and may vary significantly
  return Math.ceil(text.length / 4);
};

/**
 * Validates that the API key format looks correct
 */
export const validateApiKey = (apiKey: string | null | undefined): boolean => {
  return !!apiKey && apiKey.startsWith("hf_");
};

