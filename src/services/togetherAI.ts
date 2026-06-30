import type { ChatMessage } from "./aiContext";

export type AIError =
  | { type: "auth"; message: string }
  | { type: "rate_limit"; message: string }
  | { type: "network"; message: string }
  | { type: "server"; message: string }
  | { type: "unknown"; message: string };

export async function streamCompletion(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: AIError) => void
): Promise<void> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

  if (!apiKey) {
    onError({ type: "auth", message: "No API key found. Set VITE_GROQ_API_KEY in your .env file." });
    return;
  }

  let response: Response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });
  } catch {
    onError({ type: "network", message: "Could not reach Groq. Check your connection." });
    return;
  }

  if (!response.ok) {
    if (response.status === 401) {
      onError({ type: "auth", message: "Invalid API key. Check VITE_GROQ_API_KEY." });
    } else if (response.status === 429) {
      onError({ type: "rate_limit", message: "Rate limit hit. Please wait a moment and try again." });
    } else if (response.status >= 500) {
      onError({ type: "server", message: `Groq server error (${response.status}). Try again shortly.` });
    } else {
      onError({ type: "unknown", message: `Unexpected error (${response.status}).` });
    }
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    onError({ type: "unknown", message: "No response body from API." });
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(data);
        const chunk = parsed?.choices?.[0]?.delta?.content;
        if (chunk) onChunk(chunk);
      } catch {
        // malformed line — skip
      }
    }
  }

  onDone();
}
