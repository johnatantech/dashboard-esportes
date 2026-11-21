// Proxy (Vercel): esconde o token da football-data.org do navegador.
export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.football-data.org/v4/competitions/BSA/matches", {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN },
    });
    const data = await r.json();
    
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: "Falha ao consultar a football-data.org" });
  }
}
