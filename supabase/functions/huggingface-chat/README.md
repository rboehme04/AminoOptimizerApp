# Edge Function: huggingface-chat

Diese Function leitet Chat-Anfragen an die Hugging Face Inference API (Llama 3.1 8B) weiter. Der HF-Token liegt **nur auf dem Server** in Supabase Secrets und wird nie an den Client gesendet.

## Secret setzen

Den Hugging Face Token in Supabase hinterlegen (einmalig pro Projekt):

```bash
# Supabase CLI (nach `supabase login`)
supabase secrets set HF_TOKEN=hf_DEIN_TOKEN_HIER
```

Oder im **Supabase Dashboard**: Project Settings → Edge Functions → Secrets → `HF_TOKEN` eintragen.

## Lokal testen

Mit Supabase CLI:

```bash
supabase functions serve huggingface-chat --env-file .env.local
```

In `.env.local` (nur lokal, nicht committen):

```
HF_TOKEN=hf_DEIN_TOKEN
```

## JWT-Verifizierung (401 beheben)

Wenn die App **401 Unauthorized** bekommt: Die Function darf nicht „Verify JWT“ verlangen, weil die App mit dem **Anon-Key** (ohne Login) aufruft.

- **Über CLI deployen** (setzt `verify_jwt = false` aus config.toml):
  ```bash
  supabase functions deploy huggingface-chat
  ```
- **Nur per Dashboard deployed?** Dann in Supabase Dashboard → Project Settings → Edge Functions → bei der Function **„Enforce JWT verification“ deaktivieren** (oder die Function erneut per CLI mit obigem Befehl deployen).

## Aufruf aus der App

Die App ruft die Function über `supabase.functions.invoke('huggingface-chat', { body: { prompt, systemPrompt?, messages?, ... } })` auf. Es wird **kein** API-Key mehr in der Expo-Umgebung benötigt.

## Alte Umgebungsvariablen entfernen

Nach dem Deploy und Test aus der **Expo-/Client-Umgebung** entfernen:

- `EXPO_PUBLIC_HF_TOKEN`
- `EXPO_PUBLIC_HUGGINGFACE_API_KEY`

Diese dürfen nur noch in Supabase (Secrets) stehen, nicht in `.env` oder EAS/Expo Environment.
