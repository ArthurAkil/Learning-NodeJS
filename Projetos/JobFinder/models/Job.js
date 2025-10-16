const Sequelize = require("sequelize");

const db = require("../db/connection");

// para definir o model a gente puxa o db (que tem o require da pasta db e puxa connection)
// o primeiro argumento db.define("Job",) -> é o nome do model
// o segundo argumento db.define(,{}) -> são os atributos da model
const Job = db.define("Job", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  salary: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  new_job: {
    type: Sequelize.INTEGER,
  },
});

// Agora precisamos exportar
module.exports = Job;
