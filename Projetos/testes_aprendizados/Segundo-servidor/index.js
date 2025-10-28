// // inicializar o nodemon -> yarn add nodemon -> yarn nodemon index.js -> scripts package.json -> yarn dev

// const express = require("express");
// const app = express();
// const PORT = 8180;
// app.use(express.json());

// // conceitos:

// // http://locahost:8180/users?nome=Arthur&idade=21
// //Query params = ?nome=Arthur&idade=21  //parametro de consulta, parametro de query, são parametro opcionais e por isso que vem o ?

// // http:localhost:8180/users/1
// // route params = /users/1 ou /users/nome    // obrigatorios

// // todos os parametros requisitados são pegos pelo request
// app.get("/hello", (request, response) => {
//   // request.body: Enviar dados para criar/modificar um recurso (dados de formulário, JSON de um novo objeto). Não aparece na URL (mais seguro para dados sensíveis ou longos). Geralmente vem com uma informação do front, é feito para cadastrar
//   // request.query: Enviar opções, filtros ou informações leves para consulta (filtragem, paginação, busca). Aparece na URL (visível nos logs do servidor, histórico do navegador).

//   // quando aplicamos a destruturação {nome} estamos tentando acessar já diretamente algum objeto com valor nome, exemplo: http://localhost:8180/hello?nome=arthur
//   // objeto nome tem valor arthur, {} está desestruturando o objeto nome e já pegando o valor que possui dentro assimilando com o que já digitamos {nome}
//   const { nome, idade } = request.query;

//   // sempre buscar que toda resposta seja feita em json
//   return response
//     .status(200)
//     .json({ title: "Hello word", message: `Olá ${nome}, idade: ${idade}` });
// });

// // route params
// app.get("/hello/:nome", (req, res) => {
//   const { nome } = req.params;

//   return res.status(200).json({ title: "Hello word", message: `Olá ${nome}` });
// });

// let customers = [
//   { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
//   { id: 2, name: "Google", site: "http://google.com" },
//   { id: 3, name: "UOL", site: "http://uol.com.br" },
// ];

// app.get("/customers", async (req, res) => {
//   return res.json(customers);
// });

// app.get("/customers/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   const customer = customers.find((item) => item.id === id);

//   const status = customer ? 200 : 404; // se estiver retorna 200 se não 404

//   // não mostrando com a formatação boa, podemos fazer JSON.stringfy(customer)
//   console.debug("GET :: /customers/:id", customer);

//   return res.status(status).json(customer);
// });

// app.post("/customers/cadastrar", async (req, res) => {
//   const { name, site } = req.body;

//   const id = customers[customers.length - 1].id + 1;

//   const newCustomer = { id, name, site };

//   customers.push(newCustomer);

//   return res.status(201).json({
//     message: "Criado com sucesso",
//     customer: newCustomer,
//   });
// });

// app.put("/customers/atualizar/:id", async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, site } = req.body;

//   const index = customers.findIndex((item) => item.id === id);
//   const status = index >= 0 ? 200 : 404;

//   if (index >= 0) {
//     customers[index] = { id: parseInt(id), name, site };
//   }

//   return res.status(status).json({
//     customer: customers[index],
//   });
// });

// app.delete("/customers/delete/:id", async (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = customers.findIndex((item) => item.id === id);
//   const status = index >= 0 ? 200 : 404;

//   if (index >= 0) {
//     customers.splice(index, 1);
//   }

//   return res.status(status).send("usuario deletado");
// });

// app.listen(PORT, () => {
//   console.log(`Servidor na porta: ${PORT}`);
//   console.log(`Servidor rodando no http://localhost:${PORT}/`);
// });

// // para rodar yarn node index.js
