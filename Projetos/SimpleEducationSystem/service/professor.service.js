const Professor = require("../models/Professor");
const Coordenador = require("../models/Coordenador");

const createProfessorService = async (data) => {
  const { nome, materia, CoordenadorId } = data;

  const novoProfessor = await Professor.create({
    nome,
    materia,
    CoordenadorId,
  });

  return novoProfessor;
};

const getAllProfessorsService = async () => {
  const professores = await Professor.findAll({
    include: [
      {
        model: Coordenador,
        attributes: ["nome"],
      },
    ],
  });

  return professores;
};

const getProfessorService = async (id) => {
  const professor = await Professor.findByPk(id, {
    include: [
      {
        model: Coordenador,
        attributes: ["nome"],
      },
    ],
  });

  return professor;
};

const atualizarProfessorService = async (body, id) => {
  const { nome, materia, CoordenadorId } = body;

  const [linhasAfetadas] = await Professor.update(
    {
      nome,
      materia,
      CoordenadorId,
    },
    { where: { id: id } }
  );

  if (linhasAfetadas === 0) {
    return linhasAfetadas;
  }

  const professorAtualizado = await Professor.findByPk(id, {
    include: [{ model: Coordenador, attributes: ["nome"] }],
  });

  return professorAtualizado;
};

const deletarProfessorService = async (id) => {
  const linhasExcluidas = await Professor.destroy({
    where: { id: id },
  });

  return linhasExcluidas;
};

module.exports = {
  createProfessorService,
  getAllProfessorsService,
  getProfessorService,
  atualizarProfessorService,
  deletarProfessorService,
};
