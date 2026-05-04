# Denuncia Ciudadana — Demo

Demo interactivo de la plataforma con agente IA integrado.

## Setup

1. Conecta este repo a Netlify
2. En Netlify → Site configuration → Environment variables → Add:
   - `ANTHROPIC_API_KEY` = tu API key de Anthropic
3. Deploy automático listo

## Estructura

```
index.html                  → Demo principal (abrir en browser)
netlify/functions/
  claude-proxy.js           → Proxy serverless hacia Anthropic API
netlify.toml                → Configuración de Netlify
cloudflare-worker.js        → Alternativa: proxy en Cloudflare Workers
```
