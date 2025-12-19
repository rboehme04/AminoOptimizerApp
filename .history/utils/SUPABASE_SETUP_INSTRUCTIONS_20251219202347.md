# Complete Setup Instructions: Secure Hugging Face API Key in Supabase

## 🎯 Goal
Store your Hugging Face API key (`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`) securely in Supabase Edge Functions instead of exposing it in client-side code.

## 📦 Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

Or if you prefer using npx:
```bash
# You can use npx instead, no global install needed
```

## 🔐 Step 2: Login to Supabase

```bash
supabase login
```

This will open your browser to authenticate.

## 🔗 Step 3: Link Your Project

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to Settings → General
4. Find your "Reference ID" (it looks like: `abcdefghijklmnop`)
5. Run:

```bash
supabase link --project-ref YOUR_PROJECT_REF_ID
```

Replace `YOUR_PROJECT_REF_ID` with your actual reference ID.

## 🔑 Step 4: Set the Secret

Store your Hugging Face token as a secret in Supabase:

```bash
supabase secrets set HF_TOKEN=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
```

**Important:** 
- This stores the secret securely in Supabase
- It will NOT be exposed to client-side code
- Only your Edge Functions can access it

## 🚀 Step 5: Deploy the Edge Function

The Edge Function code is already created at:
`supabase/functions/huggingface-proxy/index.ts`

Deploy it:

```bash
supabase functions deploy huggingface-proxy
```

You should see output like:
```
Deploying huggingface-proxy (project ref: xxxxxx)
...
Function huggingface-proxy deployed successfully
```

## ✅ Step 6: Test the Edge Function

You can test it from the command line:

```bash
supabase functions invoke huggingface-proxy --body '{
  "messages": [
    {"role": "user", "content": "Say hello in one sentence."}
  ],
  "options": {
    "max_new_tokens": 50
  }
}'
```

## 🔄 Step 7: Update Your Client Code

Update `hooks/useLLM.tsx` to use the Supabase Edge Function instead of calling Hugging Face directly.

See the updated code in the next section.

## 🧹 Step 8: Clean Up

1. Remove `HF_TOKEN` from your `.env` file (or comment it out)
2. Remove `EXPO_PUBLIC_HF_TOKEN` if you added it
3. The API key is now securely stored in Supabase

## 🔍 Step 9: Verify Security

1. Build your app: `npm run build` (or `expo build`)
2. Check the bundle - your API key should NOT be in the JavaScript
3. The key is only accessible server-side in the Edge Function

## 📝 Troubleshooting

### Error: "HF_TOKEN not configured"
- Make sure you ran: `supabase secrets set HF_TOKEN=...`
- Verify with: `supabase secrets list`

### Error: "Function not found"
- Make sure you deployed: `supabase functions deploy huggingface-proxy`
- Check your project is linked: `supabase projects list`

### Error: CORS issues
- The Edge Function already includes CORS headers
- Make sure you're calling it from your app's domain

### Error: "Unauthorized"
- Make sure your Supabase client is properly initialized
- Check your `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY` are set

## 🎉 Success!

Once set up, your Hugging Face API key is:
- ✅ Stored securely in Supabase
- ✅ Never exposed to client-side code
- ✅ Protected from extraction
- ✅ Can be rotated easily by updating the secret

## 🔄 Updating the Secret

If you need to rotate or update your API key:

```bash
supabase secrets set HF_TOKEN=your_new_token_here
```

No need to redeploy the function - secrets are updated automatically.

