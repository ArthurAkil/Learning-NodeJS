/* 1 para começo de projeto é sempre uma receita de bolo em relação ao começo
importar o express (require ou de outra forma com outra biblioteca), definir uma variavel que recebe o express e definir uma porta 
Qualquer dúvida lembrar de ver a documentação: https://expressjs.com/*/

const express = require("express"); // 1 importando
const server = express(); // 1 inicializando
const PORT = 8080;

// 2 criando uma rota get
server.get("/hello", (req, res) => {
  // 2 Sempre vamos retornar algo como JSON, para que o front possa consumir
  // 2 Também colocamos o status (codigo http)
  res.status(200).json({
    title: "Hello word",
    message:
      "Essa é a mensagem que veio junto, atualiza automaticamente com nodemon",
  });
});

// 2 parametros de consulta query = query paramns e parametros de rota = route paramns

// 2 Parametro de consulta: (Opcionais)
// 2 Query paramns = utiliza o ?nome=Arthur&idade=25
// 2 http://localhost:${PORT}/usuarios?nome=Arthur&idade=25
server.get("/usuarios", (req, res) => {
  // 2 pegamos o valor da query por meio do request, alocando em uma variavel
  // 2 podemos usar a descontrução {} para pegar o valor diretamente e não precisar escrever req.query.valor
  // 2 Acredito que pela lógica, a query paramns se comporta diferente do route paramns, pois a query vai buscar todos os resultados (ou no caso usuarios), que possuem o nome passado e a idade passada, então pode acabar sendo um retorno unico, mas no geral é uma busca ampla (ex.: liquidificador -> fazendo essas busca em um site) que retorna varios valores, como uma filtragem/busca/paginação de valores
  const { nome, idade } = req.query;

  res.json({
    rota: "usuarios",
    consulta: `O nome buscado foi ${nome} e tem idade de ${idade}`, // 2 caso nenhum valor seja passado na query, o valor de nome fica undefined, caso o valor seja retornado numa chave isolada (ex.: idade: idade), se o valor não for definido na query a chave não é passada pro json pois consta que "não existe"
  });
});

// 2 Parametros integrados a rota e a rota vai responder ou não se tiver o parametro: (obrigatórios)
// 2 Route paramns =
// 2 http://localhost:${PORT}/usuarios/:nome (ou :id, pode ser varios)

server.get("/usuarios/:nome", (req, res) => {
  // 2 Acredito que pela lógica, a route paramns deve ser algo objetivo, direto a algo que existe (verificando dentro do service se existe tal usuario com tal nome, se sim retorna ele e se não um 404, pois não existe, ou seja, é para pegar algo no singular)
  const { nome } = req.params;

  res.json({
    rota: "/usuarios",
    parametros: `Utiliza o parametro ${nome}`,
  });
});

// 3 por causa do nodemon e do script que colocamos no package.json agora iniciamos o server com yarn dev
// 1 abrir o servidor
server.listen(PORT, () => {
  console.log(`Servidor aberto na porta http://localhost:${PORT}`);
});
