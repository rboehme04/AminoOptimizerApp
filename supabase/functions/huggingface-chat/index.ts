// Supabase Edge Function: Proxies chat requests to Hugging Face (router API).
// The HF token is stored in Supabase secrets (HF_TOKEN), not in the client.
// Uses https://router.huggingface.co (api-inference.huggingface.co is deprecated).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL_NAME = "meta-llama/Llama-3.1-8B-Instruct";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hfToken = Deno.env.get("HF_TOKEN");
  if (!hfToken || !hfToken.startsWith("hf_")) {
    console.error("HF_TOKEN not set or invalid in Supabase Edge Function secrets");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: {
    prompt?: string;
    systemPrompt?: string;
    messages?: ChatMessage[];
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages: ChatMessage[];

  if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
    messages = body.messages;
  } else if (body.prompt != null && typeof body.prompt === "string") {
    messages = [];
    if (body.systemPrompt) {
      messages.push({ role: "system", content: body.systemPrompt });
    } else {
      messages.push({
        role: "system",
        content: "You are a concise, helpful assistant.",
      });
    }
    messages.push({ role: "user", content: body.prompt });
  } else {
    return new Response(
      JSON.stringify({ error: "Body must include 'prompt' or 'messages'" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const requestBody = {
    model: MODEL_NAME,
    messages,
    max_tokens: body.max_new_tokens ?? 512,
    temperature: body.temperature ?? 0.7,
  };

  try {
    const hfRes = await fetch(HF_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await hfRes.json();

    if (!hfRes.ok) {
      const errorMessage =
        typeof data?.error?.message === "string"
          ? data.error.message
          : typeof data?.error === "string"
            ? data.error
            : `HTTP ${hfRes.status}`;
      return new Response(
        JSON.stringify({ error: `Hugging Face API error: ${errorMessage}` }),
        {
          status: hfRes.status >= 500 ? 502 : 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const content =
      data?.choices?.[0]?.message?.content ?? "";

    return new Response(
      JSON.stringify({ content }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Request failed" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
});
