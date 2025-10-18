const { sequelize } = require("../db/connection");
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

Professor.hasMany(Aluno);
Aluno.belongsTo(Professor);

module.exports = Aluno;
