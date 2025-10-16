const express = require("express");

const app = express();

const db = require("./db/connection");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});

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

// antes iniciariamos com node app.js
// mas ai para ver qualquer atualização precisariamos parar o servidor e rodar dnv, com o nodemon não precisamos disso
// alteramos o package.json, colocamos em scripts o dev nodemon app.js
// agora iniciamos o projeto digitando npm run dev
