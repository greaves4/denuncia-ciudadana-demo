// ─────────────────────────────────────────────────────────────
//  Denuncia Ciudadana – Proxy Anthropic API
//  Cloudflare Worker
//
//  Deploy: workers.cloudflare.com/new → pega este código → Deploy
//  Luego copia la URL que te da (ej. https://mi-worker.xxxxx.workers.dev)
//  y pégala en el HTML donde dice WORKER_URL_AQUI
// ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Pon tu API Key aquí, o mejor: en Variables de entorno del Worker
          // En el dashboard: Settings → Variables → ANTHROPIC_API_KEY
          'x-api-key': env.ANTHROPIC_API_KEY || 'sk-ant-TU-KEY-AQUI',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
};
