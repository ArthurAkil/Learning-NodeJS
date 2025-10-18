// fazer a validação dos dados de cadastro de aluno
const Professor = require("../models/Professor");

const validarCadastroAluno = async (request, response, next) => {
  const { nome, matricula, ProfessorId } = request.body;

  //   valida nome
  if (!nome || nome.trim() === "") {
    // se não tiver nome ou for vazio
    return response.status(400).json({
      mensagem: "O campo nome é obrigatorio e não pode ser vazio",
    });
  }

  //   valida matricula
  if (!matricula || matricula.trim() === "") {
    return response.status(400).json({
      mensagem: "O campo matricula é obrigatorio e não pode ser vazio",
    });
  }

  //   validação do ProfessorId
  if (ProfessorId) {
    const professorExiste = await Professor.findByPk(ProfessorId);

    if (!professorExiste) {
      return response.status(400).json({
        mensagem: "ProfessorId fornecido é inválido",
      });
    }
  }

  //   se chegar até aqui é porque é validação
  next();
};

module.exports = validarCadastroAluno;
