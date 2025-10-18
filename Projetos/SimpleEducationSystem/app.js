const express = require("express");
const app = express();
const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/`);
});
