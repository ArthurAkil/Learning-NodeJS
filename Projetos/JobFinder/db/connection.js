// aqui vamos colocar sequelize
// usado para banco de dados relacionais

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/app.db",
});

// para exportar para o app.js
module.exports = sequelize;
