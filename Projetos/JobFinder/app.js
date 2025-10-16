const express = require("express");

const exphbs = require("express-handlebars");

const app = express();

const path = require("path");

const db = require("./db/connection");

const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});

// body_parser
app.use(bodyParser.urlencoded({ extended: false })); // agora estamos utilizando o bodyparser, então a parte de vir algo do body nas rotas 'request.body' (routes/jobs.js) quando envio informação já está funcionando agr

// handle bars
app.set("views", path.join(__dirname, "views"));
//informamos que as views (layouts, com html no formato de handlebars para renderizar os dados que vem do backend com facilidade maior) do nosso projeto estara em algum diretorio, definimos o diretorio das views/layouts do projeto

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// qual o arquivo principal de layoult (main)
app.set("view engine", "handlebars");
// definir qual o framework ou biblioteca que iremos utilizar para renderizar as views

// static folder
app.use(express.static(path.join(__dirname, "public")));

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
  response.render("index");
});

// jobs routes

app.use("/jobs", require("./routes/jobs"));
// (criamos as rotas em arquivos separados e precisamos puxar ele para o app.js arquivo principal)
// basicamente deixando assim fica /jobs/add/

// antes iniciariamos com node app.js
// mas ai para ver qualquer atualização precisariamos parar o servidor e rodar dnv, com o nodemon não precisamos disso
// alteramos o package.json, colocamos em scripts o dev nodemon app.js
// agora iniciamos o projeto digitando npm run dev
