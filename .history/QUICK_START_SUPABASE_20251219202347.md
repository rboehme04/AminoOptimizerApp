# Quick Start: Secure Hugging Face API Key in Supabase

## 🚀 Fast Setup (5 minutes)

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login
```bash
supabase login
```

### 3. Link Your Project
Get your project reference ID from Supabase dashboard → Settings → General
```bash
supabase link --project-ref YOUR_PROJECT_REF_ID
```

### 4. Set the Secret
```bash
supabase secrets set HF_TOKEN=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
```

### 5. Deploy the Function
```bash
supabase functions deploy huggingface-proxy
```

### 6. Done! ✅

Your API key is now secure. The client code will automatically use the Supabase Edge Function.

## 📁 Files Created

- `supabase/functions/huggingface-proxy/index.ts` - Edge Function code
- `utils/huggingfaceSupabase.ts` - Client utility to call the function
- `hooks/useLLM.tsx` - Updated to use Supabase (already done)

## 🧪 Test It

The test in `Optimizer.tsx` will now call the secure Edge Function instead of exposing your key.

## 📚 Full Documentation

See `utils/SUPABASE_SETUP_INSTRUCTIONS.md` for detailed instructions and troubleshooting.

