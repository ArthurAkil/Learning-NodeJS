const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");
const Coordenador = require("./Coordenador");

const Professor = sequelize.define("Professor", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Coordenador.hasMany(Professor);
Professor.belongsTo(Coordenador);

module.exports = Professor;
