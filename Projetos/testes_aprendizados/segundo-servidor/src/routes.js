// 3. Esse arquivo vai ser especializado somente em agrupar as rotas do nosso aplicativo, direcionando para o controller específicos
// 3. Por que é interessante separarmos as rotas do controllers? Por questão de organização e melhor visualização e entendimento do código

import { Router } from "express"; //importamos o sistema de rotas do express o Router, basicamente vai fazer a mesma coisa do server.get e por ai vai

// Em resumo, o new Router() é usado para criar uma instância de roteador modular e isolada para organizar as rotas em arquivos separados, mantendo o arquivo principal (app.js) limpo e focado apenas na configuração geral do servidor.
const routes = new Router();

routes.get("/", async (req, res) => {
  return res.json({ message: "Hello" });
});

export default routes;
