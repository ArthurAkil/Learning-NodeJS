// 1. Primeira coisa que fazemos é importar o express
const express = require("express");
// 1.1 agora dentro da constante temos todas as configurações do express

const app = express();
// 2 passando o express pra dentro de outra constante, é com ela que vamos construir nosso servidor

// 3 coloquei a porta numa variavel para melhor acesso
const PORT = 8081;
// 3.1 agora colocamos para nosso aplicativo escutar uma porta com o listen() que recebe como parâmetros a porta para acessar, e uma função
app.listen(PORT, () => {
  // 3.2 vai fazer sempre que o servidor abrir:
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/`);
});
