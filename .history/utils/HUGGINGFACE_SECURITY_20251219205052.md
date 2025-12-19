# Hugging Face API Security Best Practices

## ⚠️ Security Risk

**Exposing your Hugging Face API token in client-side code is a security risk.**

Any environment variable prefixed with `EXPO_PUBLIC_` gets bundled into your app's JavaScript, making it visible to anyone who:
- Inspects your app's code
- Uses browser dev tools
- Decompiles your mobile app

## ✅ Recommended Solutions

### Option 1: Use Supabase Edge Functions (Recommended)

Since you're already using Supabase, create an Edge Function to proxy Hugging Face API calls:

1. **Create a Supabase Edge Function:**
   ```typescript
   // supabase/functions/huggingface-proxy/index.ts
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   import { HfInference } from "npm:@huggingface/inference@2.6.4"

   serve(async (req) => {
     const { messages, options } = await req.json()
     const hf = new HfInference(Deno.env.get("HF_TOKEN")!)
     
     const result = await hf.textGeneration({
       model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
       inputs: formatChatTemplate(messages),
       parameters: options,
     })
     
     return new Response(JSON.stringify({ generated_text: result.generated_text }))
   })
   ```

2. **Update your client code** to call the Edge Function instead:
   ```typescript
   const response = await supabase.functions.invoke('huggingface-proxy', {
     body: { messages, options }
   })
   ```

### Option 2: Use Hugging Face Inference Endpoints (If Available)

If you have access to Inference Endpoints, you can set up authentication there instead.

### Option 3: Accept the Risk (For Development Only)

If this is:
- A personal project
- Not production
- Low usage/risk

You can accept the risk, but:
- Set up usage alerts in Hugging Face
- Monitor your API usage regularly
- Rotate your API key periodically
- Use rate limiting if possible

## 🔒 Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** (even if exposed, better than hardcoding)
3. **Rotate keys regularly** if exposed
4. **Monitor usage** for unexpected spikes
5. **Set up alerts** for high usage
6. **Use read-only tokens** when possible
7. **Implement rate limiting** on your backend if using a proxy

## 📝 Current Setup Assessment

Your current setup exposes the token client-side. Consider:
- Is this a production app? → Use Option 1 (Backend Proxy)
- Is this a personal/development project? → Option 3 might be acceptable
- Do you expect many users? → Definitely use Option 1

