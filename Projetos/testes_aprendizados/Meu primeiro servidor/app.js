// 5. instalando a biblioteca nodemon para que o servidor atualize em tempo real, não precisar fechar o servidor e abrir de novo sempre quando colocar algo novo
// 5.1 podemos instalar de forma global: npm install -g nodemon (fica salvo no meu system path do pc)
// 5.2 ou podemos instalar como dependencia: npm install --save-dev nodemon (utilizei esse, atualiza o package.json)
// 5.3 agora não iniciamos o servidor mais com node app.js e sim como nodemon app.js ou ajustamos os scripts em package.json "start": "node server.js", "dev": "nodemon server.js" assim podemos iniciar o servidor com npm run dev
//--------------------------------------------------------------

// 6. sequelize (db)

//--------------------------------------------------------------
// 0. npm init -> npm install express
// 1. Primeira coisa que fazemos é importar o express
const express = require("express");
// 1.1 agora dentro da constante temos todas as configurações do express
//--------------------------------------------------------------

const app = express();
// 2 passando o express pra dentro de outra constante, é com ela que vamos construir nosso servidor
//--------------------------------------------------------------

// 3 coloquei a porta numa variavel para melhor acesso
const PORT = 8081;
// 3.1 agora colocamos para nosso aplicativo escutar uma porta com o listen() que recebe como parâmetros a porta para acessar, e uma função
app.listen(PORT, () => {
  // 3.2 vai fazer sempre que o servidor abrir:
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/`);
});
//--------------------------------------------------------------

// 4. rotas
// ex.: www.meusite.com     -> rota principal ou home ou /
// ex. rotas: www.meusite.com/artigos/   www.meusite.com/contatos/      www.meusite.com/artigos/novos/

// 4.1 utilizamos o get do express e nele colocamos dois parâmetros, o primeiro parâmetro é em string "/" informando a rota, no caso da / isolada é considerada a home
// 4.2 no segundo parâmetro é colocado uma função que recebe dois parâmetros, request -> feita pelo usario que ta usando o sistema, response -> resposta do servidor para o usuario, e o escopo da função é a logica aplicada ou o que vai aparecer na tela
// 4.3 o response.send("texto") envia uma mensagem direta no seco, não é um html bonitinho nem nada, esse bloco de código é usado para mandar objetos guardados no banco de dados para o frontend
app.get("/", (request, response) => {
  response.send("Você está na home");
});

app.get("/artigos", (request, response) => {
  response.send("Todos os artigos, rota artigos");
});

app.get("/contato", (req, res) => {
  res.send("Você está na rota contato");
});

// 4.4 parametros na rota
// 4.4.1 estamos passando como parâmetro um id em /artigos/:id -> significa que queremos um artigo específico daquele grupo de artigos
// 4.4.2 o parâmetro da requisição feita pode ser acessada por meio do request, buscando os parâmetros nele (params) -> request.params.id
app.get("/artigos/:id", (request, response) => {
  if (request.params.id == "1") {
    response.send("1 - Artigo como criar sistemas");
  } else {
    response.send("Não temos esse artigo com essa id");
  }
});
