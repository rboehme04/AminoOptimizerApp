# Hugging Face Llama 3.1 8B Setup Guide

This guide explains how to use Meta Llama 3.1 8B via Hugging Face in your TypeScript/React Native app.

## Prerequisites

1. **Hugging Face Account**: Create a free account at https://huggingface.co
2. **API Token**: 
   - Go to https://huggingface.co/settings/tokens
   - Create a new token with **read** permissions (or read/write if you plan to push models)
   - Copy your token (it should start with `hf_`)
3. **Model Access**: 
   - Visit https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct
   - Accept Meta's terms of service (approval usually takes a few minutes)
   - Once approved, you'll have access to all Llama 3.1 models

## Setup

1. **Create a `.env` file** in your project root (if it doesn't exist):
   ```bash
   EXPO_PUBLIC_HUGGINGFACE_API_KEY=your_hf_token_here
   ```

2. **Add `.env` to `.gitignore`** (if not already there):
   ```
   .env
   .env.local
   ```

3. **Restart your Expo development server** after adding the environment variable.

## Usage

### Basic Usage with useLLM Hook

```typescript
import { useLLM } from "@/hooks/useLLM";

function MyComponent() {
  const { response, isLoading, error, callLLM, reset } = useLLM();

  const handleGenerate = async () => {
    await callLLM(
      "Tell me a joke about data science",
      "You are a helpful assistant" // optional system prompt
    );
  };

  return (
    <View>
      <Button onPress={handleGenerate} title="Generate" />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {response && <Text>{response}</Text>}
    </View>
  );
}
```

### Advanced Usage with Direct API Calls

```typescript
import { generateText, formatChatTemplate, type ChatMessage } from "@/utils/huggingface";

const messages: ChatMessage[] = [
  { role: "system", content: "You are a professional nutritionist" },
  { role: "user", content: "What are the benefits of protein?" }
];

const response = await generateText(
  messages,
  { apiKey: process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY! },
  {
    max_new_tokens: 512,
    temperature: 0.7,
    top_p: 0.9,
  }
);
```

## API Reference

### `useLLM()` Hook

Returns:
- `response: string | null` - The generated text response
- `isLoading: boolean` - Whether a request is in progress
- `error: string | null` - Error message if request failed
- `callLLM(prompt: string, systemPrompt?: string): Promise<void>` - Call the LLM
- `reset(): void` - Reset the hook state

### `generateText()` Function

```typescript
generateText(
  messages: ChatMessage[],
  config: { apiKey: string; model?: string },
  options?: {
    max_new_tokens?: number;      // Default: 512
    temperature?: number;          // Default: 0.7
    top_p?: number;               // Default: 0.9
    top_k?: number;               // Default: 50
    repetition_penalty?: number;  // Default: 1.1
    return_full_text?: boolean;   // Default: false
  }
): Promise<string>
```

## Differences from Python Implementation

The TypeScript implementation uses the **Hugging Face Inference API** instead of loading models locally. This means:

✅ **Advantages:**
- No need to download large model files
- Works on any device/platform
- Simpler setup
- Free tier available

⚠️ **Limitations:**
- Requires internet connection
- Tokenization is approximated (not exact like Python tokenizer)
- Rate limits apply (check Hugging Face pricing)

## Troubleshooting

### "API key not found" error
- Make sure you've created a `.env` file with `EXPO_PUBLIC_HUGGINGFACE_API_KEY`
- Restart your Expo dev server after adding the variable
- Check that the variable name is exactly `EXPO_PUBLIC_HUGGINGFACE_API_KEY`

### "Invalid API key format" error
- Your API key should start with `hf_`
- Make sure you copied the full token from Hugging Face settings

### "Model access denied" error
- Visit https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct
- Accept Meta's terms of service
- Wait a few minutes for approval

### Rate limiting
- Free tier has rate limits
- Consider upgrading to a paid plan for production use
- Implement retry logic with exponential backoff

## Example: Using in Optimizer Screen

The `Optimizer.tsx` screen already uses the `useLLM` hook. To actually call the LLM when the prompt is ready:

```typescript
// In Optimizer.tsx, add this effect:
useEffect(() => {
  if (prompt && !isLoading && !response) {
    callLLM(prompt, "You are a professional nutritionist and recipe developer.");
  }
}, [prompt, isLoading, response, callLLM]);
```

