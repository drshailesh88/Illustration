# LLM Proxy Server

This is a minimal OpenAI chat-completions proxy for local development.

## Run

```bash
OPENAI_API_KEY=sk-... PORT=8787 node server/llm-proxy.mjs
```

## Configure the client

Set this in your Vite env:

```bash
VITE_OPENAI_PROXY_URL=http://localhost:8787/v1/chat/completions
```

Notes:
- If `OPENAI_API_KEY` is not set on the server, the proxy will accept a client
  `Authorization: Bearer ...` header instead (not recommended for production).
- This proxy enables CORS for all origins by default. Set `CORS_ORIGIN` to
  restrict it.
