const { sequelize } = require("../db/db_connection");
const { DataTypes } = require("sequelize");
const Professor = require("./Professor");

const Aluno = sequelize.define("Aluno", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Um professor pode lecionar vários alunos
Professor.hasMany(Aluno);
Aluno.belongsTo(Professor);

module.exports = Aluno;
