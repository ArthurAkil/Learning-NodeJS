const express = require("express");
const app = express();
const PORT = 8081;

// Importamos a conexão com o banco de dados para garantir que os models sejam carregados
const { sequelize } = require("./db/db_connection");

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/`);
});
