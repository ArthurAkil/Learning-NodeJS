const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
    pool: { max: 5, min: 0, idle: 30000, acquire: 10000 },
  }
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso");
  } catch (error) {
    console.log("Erro ao se conectar com o banco de dados" + error);
  }
};

module.exports = { Sequelize, sequelize };
