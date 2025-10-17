// Esse arquivo é uma referência a conexão ao banco de dados

// 6. sequelize (ajuda na integração com o banco de dados npm install --save sequelize)
// 6.1 para o sequelize funcionar corretamente nos temos que instalar o driver manualmente
// # One of the following:
// $ npm install --save pg pg-hstore # Postgres
// $ npm install --save mysql2 <- estamos usando esse
// $ npm install --save mariadb
// $ npm install --save sqlite3
// $ npm install --save tedious # Microsoft SQL Server
// $ npm install --save oracledb # Oracle Database

// 6.2 existe duas formas de importar o pacote sequelize
// const Sequelize = require("sequelize"); assim importamos a classe inteira, com todos os tipos de dados
const { Sequelize } = require("sequelize");
// assim pegamos apenas a classe construtora -> mais recomendada

// Adicionando o dotenv
require("dotenv").config();
const mysql2 = require("mysql2");
// Sequelize(nomeDoBanco, userBanco, senhaBanco, {host, qualBanco})
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

// 7. verificar se o banco de dados foi autenticado com sucesso

async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso");
  } catch (error) {
    console.log("Erro ao se conectar com o banco de dados" + error);
  }
};

// 8. precisamos utilizar esse arquivo para outros arquivos terem acesso

module.exports = {
  Sequelize, // exportanto a classe construtora
  sequelize, // exportanto a instancia de conexão
};
