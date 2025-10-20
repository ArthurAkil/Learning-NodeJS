// Instalando o Express

// Então vamos instalar pelo npm e criar um projeto novo

// npm init
// npm init -y (ja coloca tudo yes)

// npm install express

// O express sera instalado e adicionado as dependencias do nosso projeto

// documentação expressjs.com

let express = require("express"); //chamar o express com o require

let app = express(); // instanciando o express em app, agora app vai ter acesso a TODOS os metodos que o express tem

app.get("/", (request, response) => {
  response.send("Primeira rota com Express");
});
// get -> pegando dados
// / -> url (home) da página
// (request, response) =>{} -> o segundo parâmetro é uma função
// response.send("texto") -> é a resposta do servidor para o usuario para o get (está sendo hardcoded)

app.listen(3000, () => {
  console.log("A aplicação está rodando na porta 3000");
});
// .listen(3000,) -> informa a porta a qual o servidor irá abrir/poder acessa-lo
// .list(,() =>{}) -> passa uma função anonima para o teste se a aplicação está realmente funcionando

// rodar o servidor: terminal -> Learning-NodeJS/ConceitosTeoricos/12_instalando_express
// node 12.js

// localhost:3000 no browser

// 15. Vamos testar agora essa rota no postman
