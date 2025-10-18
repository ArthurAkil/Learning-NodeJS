const express = require("express");
const app = express();
const PORT = 8081;

// Importando a conexão do banco -> garantie que os models sejam carregados
const { sequelize } = require("./db/connection");

// Sincronizando os modelos para criar a tabela
require("./models/Aluno");
require("./models/Professor");
require("./models/Coordenador");

sequelize
  .sync({ force: false }) // false? se for true ele força a criação na tabela sempre
  .then(() => {
    console.log("Modelos sincronizados com o banco.");
  })
  .catch((error) => {
    console.log("Erro ao sincronizar" + error);
  });

app.use(express.json()); // não preciso utilizar mais o body-parser pois já foi integrado ao express
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/`);
});
