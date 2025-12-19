/**
 * Hugging Face API utilities for interacting with Meta Llama 3.1 8B
 * 
 * This TypeScript implementation provides similar functionality to the Python
 * huggingface_llama.py script, using the Hugging Face Inference SDK.
 * 
 * To use this:
 * 1. Get your Hugging Face API token from https://huggingface.co/settings/tokens
 * 2. Make sure you have access to Meta-Llama-3.1-8B-Instruct (accept terms at https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
 * 3. Store your token securely (e.g., in environment variables or secure storage)
 */

import { HfInference } from "@huggingface/inference";

const MODEL_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct";

/**
 * Gets or creates an HfInference instance with the API key
 */
const getHfInference = (apiKey: string): HfInference => {
  return new HfInference(apiKey);
};

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
 * Uses the official @huggingface/inference SDK with conversational API
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
  
  // Create HfInference instance
  const hf = getHfInference(config.apiKey);
  
  try {
    // For conversational models, we need to use the conversational endpoint
    // Build a simple conversation from messages - just get the last user message
    // and any system message
    const systemMessage = messages.find(m => m.role === "system");
    const userMessages = messages.filter(m => m.role === "user");
    const lastUserMessage = userMessages[userMessages.length - 1];
    
    if (!lastUserMessage) {
      throw new Error("No user message found in messages");
    }
    
    // Use conversational API - build past_user_inputs and past_assistant_responses
    // For simplicity, just use the current user input
    const pastUserInputs: string[] = [];
    const pastAssistantResponses: string[] = [];
    
    // Build conversation history from messages
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      if (msg.role === "user") {
        pastUserInputs.push(msg.content);
      } else if (msg.role === "assistant") {
        pastAssistantResponses.push(msg.content);
      }
    }
    
    // Use conversational endpoint
    const result = await hf.conversational({
      model: model,
      inputs: {
        text: lastUserMessage.content,
        past_user_inputs: pastUserInputs,
        past_assistant_responses: pastAssistantResponses,
        generated_responses: [],
      },
      parameters: {
        max_new_tokens: options?.max_new_tokens ?? 512,
        temperature: options?.temperature ?? 0.7,
        top_p: options?.top_p ?? 0.9,
        repetition_penalty: options?.repetition_penalty ?? 1.1,
      },
    });
    
    // Extract the response
    if (result.generated_text) {
      return result.generated_text;
    }
    
    return "";
  } catch (error) {
    // Handle errors from the SDK
    if (error instanceof Error) {
      // Check for model loading errors
      if (error.message.includes("loading") || error.message.includes("estimated_time")) {
        throw new Error(
          "Model is loading. Please wait a few seconds and try again."
        );
      }
      throw new Error(`Hugging Face API error: ${error.message}`);
    }
    throw new Error("Unknown error occurred while calling Hugging Face API");
  }
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

