// 9. para criar as tabelas no banco de dados precisamos utilizar o sequelize(s minusculo) do db_connections

// 9.1 colocamos em uma variavel db (arquivo) pretendendo pegar o sequelize de db_connection
const db = require("../db/db_connection");

// 9.2 e importamos a classe dos tipos de dados disponiveis do pacote sequelize
const { DataTypes } = require("sequelize");

// 9.3 para criar o model de Produto, acessamos o db_connection, o sequelize de db_connection e a função define()
// 9.3.1 define("nomeDoModel", {
// nomeDoCampo:{
//      type: DataTypes.valor/Tipo,
//      allowNull: true/false (se o campo pode ser vazio/null)
// },
//})

const Produto = db.sequelize.define("produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// 10. como que fazemos para inserir os dados dentro da tabela?
// 10.1 normalmente isso feito por uma api, com uma view específica e recebendo valores de fora (json)
// Produto.create({
//   nome: "RTX 4060",
//   preco: "3600.0",
//   descricao: "Placa de vídeo",
// });

// 11. não utilizamos o model em nenhum local ainda, então fazemos, para forçar a criação dessa tabela
Produto.sync({ force: false }); // true -> forcaria a criação da tabela toda vez que iniciamos o servidor, duplicando, com false ele cria uma vez e se existir ele não cria dnv

// utlizamos agora node Produtos.js
// o sequelize cria de forma automatica o id de cada registro e o createdAt e updatedAt

// 12. vamos exportar nosso Produto.js
module.exports = Produto;
