import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const env = fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "";
const token = (env.match(/FOOTBALL_DATA_TOKEN=(.+)/) || [])[1]?.trim();

const routes = {
  "/api/standings": "standings",
  "/api/matches": "matches",
  "/api/scorers": "scorers?limit=100",
};

http.createServer(async (req, res) => {
  const route = routes[req.url.split("?")[0]];
  if (route) {
    try {
      const r = await fetch("https://api.football-data.org/v4/competitions/BSA/" + route, {
        headers: { "X-Auth-Token": token },
      });
      res.writeHead(r.status, { "Content-Type": "application/json" });
      res.end(await r.text());
    } catch (e) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: String(e) }));
    }
    return;
  }
  const rel = req.url === "/" ? "index.html" : req.url.split("?")[0];
  const file = path.join("public", path.normalize(rel).replace(/^(\.\.[\\/])+/, ""));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("Não encontrado"); return; }
    res.writeHead(200, { "Content-Type": file.endsWith(".html") ? "text/html; charset=utf-8" : "text/plain" });
    res.end(data);
  });
}).listen(3000, () => console.log("Rodando em http://localhost:3000"));
