const express = require("express");

const app = express();

const db = require("./db/connection");

const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});

// body_parser
app.use(bodyParser.urlencoded({ extended: false })); // agora estamos utilizando o bodyparser, então a parte de vir algo do body nas rotas 'request.body' (routes/jobs.js) quando envio informação já está funcionando agr

// db connection
// O authenticate vai fazer o teste para a conexão com o banco, ou quando tiver um crud dentro desse banco
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch((error) => {
    console.log("Ocorreu um erro", error);
  });

// routes
app.get("/", (request, response) => {
  response.send("Está funcionando 2");
});

// jobs routes

app.use("/jobs", require("./routes/jobs"));
// (criamos as rotas em arquivos separados e precisamos puxar ele para o app.js arquivo principal)
// basicamente deixando assim fica /jobs/add/

// antes iniciariamos com node app.js
// mas ai para ver qualquer atualização precisariamos parar o servidor e rodar dnv, com o nodemon não precisamos disso
// alteramos o package.json, colocamos em scripts o dev nodemon app.js
// agora iniciamos o projeto digitando npm run dev
