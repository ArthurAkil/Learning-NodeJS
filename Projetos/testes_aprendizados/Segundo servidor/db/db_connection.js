const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize("teste", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

// verificando se o bando foi autenticado
async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados autenticado com sucesso");
  } catch (error) {
    console.log("Error ao autenticar o banco" + error);
  }
};

module.exports = { Sequelize, sequelize };
