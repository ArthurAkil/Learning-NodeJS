module.exports = {
    dialect: 'postgres',
    host: "localhost",
    username: "postgres",
    password: "secret",
    database: "teste-dominando-nodejs",
    define: {
        timestamp: true, //criando duas colunas: createdAt e updatedAt
        underscored: true, //nomenclatura _ (não camelcase)
        underscoredAll: true
    }
};