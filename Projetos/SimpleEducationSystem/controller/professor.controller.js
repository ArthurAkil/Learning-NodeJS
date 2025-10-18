const {
  createProfessorService,
  getAllProfessorsService,
  getProfessorService,
  atualizarProfessorService,
  deletarProfessorService,
} = require("../service/professor.service");

const createProfessorController = async (request, response) => {
  try {
    const professorNovo = await createProfessorService(request.body);

    response.status(201).json({
      mensagem: "Professor criado com sucesso.",
    });
  } catch (error) {
    console.log("Erro interno do servidor ao cadastrar professor" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao cadastrar professor",
      mensage: error.message,
    });
  }
};

const getAllProfessorsController = async (request, response) => {
  try {
    const professores = await getAllProfessorsService();

    response.status(200).json({
      professores: professores,
    });
  } catch (error) {
    console.log(
      "Erro interno do servidor ao buscar todos os professores" + error
    );
    response.status(500),
      json({
        erro: "Erro interno do servidor ao buscar todos os professores",
        mensagem: erro.message,
      });
  }
};

const getProfessorController = async (request, response) => {
  try {
    const professor = await getProfessorService(request.params.id);

    if (!professor) {
      return response.status(404).json({
        mensagem: "Professor não encontrado.",
      });
    }

    response.status(200).json({
      professor: professor,
    });
  } catch (error) {
    console.log("Erro interno ao buscar professor específico" + error);
    response.status(500).json({
      error: "Erro interno ao buscar professor específico",
      mensagem: error.message,
    });
  }
};

const atualizarProfessorController = async (request, response) => {
  try {
    const professorAtualizado = await atualizarProfessorService(
      request.body,
      request.params.id
    );

    if (professorAtualizado === 0) {
      return response.status(404).json({
        mensagem: "Professor não foi encontrado ou nenhum dado para atualizar",
      });
    }

    response.status(200).json({
      mensagem: "Professor atualizado com sucesso.",
      professor: professorAtualizado,
    });
  } catch (error) {
    console.log(
      "Erro interno do servidor ao atualizar os dados do professor." + error
    );
    response.status(500).json({
      erro: "Erro interno do servidor ao atualizar os dados do professor.",
      mensagem: erro.message,
    });
  }
};

const deletarProfessorController = async (request, response) => {
  try {
    const professorExcluido = await deletarProfessorService(request.params.id);

    if (professorExcluido === 0) {
      return response.status(404).json({
        mensagem: "Não foi possível encontrar o professor para deletar",
      });
    }

    response.status(204).send();
  } catch (error) {
    console.log(
      "Erro interno do servidor ao tentar deletar o professor." + error
    );
    response.status(500).json({
      erro: "Erro interno do servidor ao tentar deletar o professor.",
      mensagem: erro.message,
    });
  }
};

module.exports = {
  createProfessorController,
  getAllProfessorsController,
  getProfessorController,
  atualizarProfessorController,
  deletarProfessorController,
};
