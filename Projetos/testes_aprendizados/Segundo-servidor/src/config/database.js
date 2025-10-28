module.exports = {
    dialect: 'postgres',
    host: "localhost",
    username: "postgres",
    password: "1234",
    database: "teste-dominando-nodejs",
    define: {
        timestamp: true, //criando duas colunas: createdAt e updatedAt
        underscored: true, //nomenclatura _ (não camelcase)
        underscoredAll: true
    }
};