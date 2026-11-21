# Dashboard de esportes

Painel interativo do Brasileirão Série A: classificação, resultados, próximos jogos, artilharia (com fotos) e assistências.
Dados da football-data.org. Front-end em HTML/CSS/JS puro; funções serverless (Vercel) protegem o token.

## Rodar localmente
1. Instale o Node.js
2. Copie `.env.example` para `.env.local` e coloque seu token da football-data.org
3. Rode `node dev-server.js` e abra http://localhost:3000

## Publicar
1. Suba a pasta para um repositório no GitHub
2. Importe o repositório na Vercel
3. Em Settings > Environment Variables, crie `FOOTBALL_DATA_TOKEN`

## Estrutura
- `public/index.html`: o painel
- `api/*.js`: proxies (standings, matches, scorers) com cache de 10 min
- `dev-server.js`: servidor local equivalente aos proxies
