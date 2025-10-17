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

const { Sequelize } = require("sequelize");

// Sequelize(nomeDoBanco, userBanco, senhaBanco, {host, qualBanco})
const sequelize = new Sequelize("cadastro", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

// 7. verificar se o banco de dados foi autenticado com sucesso

sequelize
  .authenticate() // verifique se o servidor esta autenticado
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
    // se sim log(mensagem)
  })
  .catch((error) =>
    console.log("Erro ao se conectar com o banco de dados" + error)
  ); //se der error, log(error)

// 8. precisamos utilizar esse arquivo para outros arquivos terem acesso

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
