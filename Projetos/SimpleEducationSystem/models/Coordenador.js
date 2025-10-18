const { sequelize } = require("../db/connection");

const { DataTypes } = require("sequelize");

const Coordenador = sequelize.define("Coordenador", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Coordenador;
