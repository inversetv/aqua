// Aqua: o app funciona só com internet. Nada é guardado no aparelho.
// Sem conexão, em vez da página de erro do navegador, aparece uma tela avisando que precisa de internet.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", ev => {
  // apaga qualquer coisa que uma versão antiga do app tenha guardado
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", ev => {
  if (ev.request.mode !== "navigate") return;
  ev.respondWith(fetch(ev.request.url, { cache: "no-store", credentials: "same-origin" })
    .catch(() => new Response(SEM_INTERNET, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } })));
});
const SEM_INTERNET = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#00103E"><title>Aqua · sem internet</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#00103E;color:#fff;font:16px/1.5 system-ui,sans-serif;text-align:center}
main{max-width:340px;padding:24px}h1{margin:18px 0 8px;font-size:24px;line-height:1.2}p{margin:0 0 22px;color:#AEB8D3}
button{min-height:48px;padding:0 26px;border:0;border-radius:999px;background:#17E1E1;color:#00103E;font:800 16px system-ui,sans-serif}</style></head>
<body><main><svg viewBox="0 0 64 64" width="72" height="72" aria-hidden="true"><path d="M32 6C26 18 14 28 14 41a18 18 0 0 0 36 0C50 28 38 18 32 6Z" fill="#17E1E1"/><path d="M14 52 50 16" stroke="#00103E" stroke-width="5" stroke-linecap="round"/><path d="M12 54 52 14" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/></svg><h1>Sem conexão com a internet</h1><p>O Aqua só funciona com internet. Ligue o Wi-Fi ou os dados móveis e tente de novo.</p><button onclick="location.reload()">Tentar de novo</button></main></body></html>`;
