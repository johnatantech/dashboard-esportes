// Função serverless (Vercel): esconde o token da football-data.org do navegador.
// 1) Crie uma conta gratuita em football-data.org e copie o token.
// 2) No projeto da Vercel, adicione a variável de ambiente FOOTBALL_DATA_TOKEN.
// 3) Coloque este arquivo em /api/standings.js e o HTML na raiz (ou em /public).
// 4) No dashboard, defina PROXY_URL = "https://SEU-PROJETO.vercel.app/api/standings".
export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.football-data.org/v4/competitions/BSA/standings", {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN },
    });
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // troque pelo seu domínio em produção
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600"); // cache de 10 min poupa o limite da API
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: "Falha ao consultar a football-data.org" });
  }
}
