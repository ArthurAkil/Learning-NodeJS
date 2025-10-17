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

// 13. importando Produto.js
const Produtos = require("./models/Produtos");

// 15. configurando body-parser
const bodyParser = require("body-parser");
// 15.1 configurando o bodyParser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 14. criando rota post que cria um produto

app.post("/cadastro", (request, response) => {
  Produtos.create({
    // nome: request.body.nome -> não ira reconhecer pois não foi instalado ainda a biblioteca body parser
    // (npm instal --save body-parser) (rebece as informações dos formularios e faz a conversão em json)
    nome: request.body.nome,
    preco: request.body.preco,
    descricao: request.body.descricao,
  })
    .then(() => {
      console.log("Produto criado com sucesso"); //em caso de erro, log(sucesso), e mande de volta uma resposta informando que foi criado
      response.send("Produto criado com sucesso");
    })
    .catch((error) => {
      console.log("Error" + error);
      response.send("Error" + error);
    }); //se deu erro, log(error)
});

// 14.2 criando rota get
app.get("/", (req, res) => {
  Produtos.findAll() // metodo do sequelize para pegar todos os Produtos cadastrados no banco de dados
    .then((produtos) => {
      //como é uma promise nos temos o then e catch e caso dê certo, ele vai receber como parâmetros os produtos e nós mandamos como resposta os produtos(valor) numa chave produtos (tudo isso por causa do body-parser que transforma o resultado retornando/enviando em json)
      res.send({ protudos: produtos }); //ou posso mandar direto os produtos res.send(produtos)
    })
    .catch((error) => {
      console.log("Deu erro" + error);
      res.send("Erro ao buscar os dados" + error);
    });
});

// 15 criando rota de pesquisa por nome de produto GET - read
app.get("/:nome", (req, res) => {
  Produtos.findAll({ where: { nome: req.params.nome } })
    .then((produto) => {
      res.send(produto);
      console.log("Consulta realizada com sucesso");
    })
    .catch((error) => {
      res.send("Produto não existe na base de dados" + error);
      console.log("Produto não existe na base de dados" + error);
    });
});

// 14.3 atualizando um produto PUT(atualizar tudo) OU PATCH(geralmente atualizar poucas informações ou todas se forem passadas)
app.patch("/atualizar/:id", (req, res) => {
  // passamos como parametro o id que queremos que seja atualizado
  Produtos.update(
    {
      // como colocamos nome e preco como allowNull: false, eles obrigatoriamente devem ser colocados
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    },
    // o segundo parâmetro do update, é um where: onde dizemos que o Produto que vai ser atualizado é aquele que possui o id no parâmetro
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.send("Sucesso ao atualizar o produto.");
      console.log("Foi atualizado com sucesso");
    })
    .catch((error) => {
      res.send("Error ao atualizar o produto" + error);
    });
});

// 14.4 delete - metodo Http da rota
app.delete("/deletar/:id", (req, res) => {
  Produtos.destroy({ where: { id: req.params.id } }) // metodo do banco de dados de deletar algo do banco de dados, mesma lógica do patch, colocamos um where para identificar qual id do produto que queremos deletar (o passado no parâmetro)
    .then(() => {
      res.send("Produto deletado com sucesso");
      console.log("Produto deletado");
    })
    .catch((error) => {
      res.send("Error ao deletar o produto" + error);
      console.log("Erro ao deletar o produto" + error);
    });
});

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
// app.get("/", (request, response) => {
//   response.send("Você está na home");
// });

// app.get("/artigos", (request, response) => {
//   response.send("Todos os artigos, rota artigos");
// });

// 4.4 parametros na rota
// 4.4.1 estamos passando como parâmetro um id em /artigos/:id -> significa que queremos um artigo específico daquele grupo de artigos
// 4.4.2 o parâmetro da requisição feita pode ser acessada por meio do request, buscando os parâmetros nele (params) -> request.params.id
// app.get("/artigos/:id", (request, response) => {
//   if (request.params.id == "1") {
//     response.send("1 - Artigo como criar sistemas");
//   } else {
//     response.send("Não temos esse artigo com essa id");
//   }
// });
