const Aluno = require("../models/Aluno");
const Professor = require("../models/Professor");
const Coordenador = require("../models/Coordenador");

const createAlunoService = async (data) => {
  const { nome, matricula, ProfessorId } = data;

  const alunoNovo = await Aluno.create({
    nome,
    matricula,
    ProfessorId: ProfessorId || null, //garantimos que o campo professorId deve possuir um id ou pode ser nulo
  });

  return alunoNovo;
};

const getAllAlunosService = async () => {
  const alunos = await Aluno.findAll({
    include: [
      {
        model: Professor,
        attributes: ["nome", "materia"],
        include: [
          {
            model: Coordenador,
            attributes: ["nome"],
          },
        ],
      },
    ],
  });

  return alunos;
};

const getAlunoService = async (id) => {
  const aluno = await Aluno.findByPk(id, {
    include: [
      {
        model: Professor,
        attributes: ["nome", "materia"],
        include: [
          {
            model: Coordenador,
            attributes: ["nome"],
          },
        ],
      },
    ],
  });

  return aluno;
};

const atualizarAlunoService = async (body, id) => {
  const { nome, matricula, ProfessorId } = body;

  const [linhasAfetadas] = await Aluno.update(
    {
      nome,
      matricula,
      ProfessorId,
    },
    { where: { id: id } }
  );

  // tratamento de erro caso não exista nada que tenha sido atualizado o update retorna 0
  if (linhasAfetadas === 0) {
    return linhasAfetadas;
  }

  const alunoAtualizado = await Aluno.findByPk(id, {
    include: Professor,
  });

  return alunoAtualizado;
};

const deletarAlunoService = async (id) => {
  const linhasDeletadas = await Aluno.destroy({
    where: { id: id },
  });

  return linhasDeletadas;
};

module.exports = {
  createAlunoService,
  getAllAlunosService,
  getAlunoService,
  atualizarAlunoService,
  deletarAlunoService,
};
