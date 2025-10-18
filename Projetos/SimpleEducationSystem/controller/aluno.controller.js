const {
  createAlunoService,
  getAllAlunosService,
  getAlunoService,
  atualizarAlunoService,
  deletarAlunoService,
} = require("../service/aluno.service");

const createAlunoController = async (request, response) => {
  try {
    const alunoNovo = await createAlunoService(request.body);

    response.status(201).json({
      mensagem: "Aluno criado com sucesso",
      aluno: alunoNovo,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao cadastrar aluno" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao cadastrar aluno",
      mensagem: error.message,
    });
  }
};

const getAllAlunosController = async (request, response) => {
  try {
    const alunos = await getAllAlunosService();

    if (!alunos) {
      return response.status(404).json({
        mensagem: "Nenhum aluno cadastrado",
      });
    }

    response.status(200).json({
      alunos: alunos,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar alunos" + error);
    response.status(500).json({
      error: "Erro interno do servidor ao buscar alunos",
      mensagem: error.message,
    });
  }
};

const getAlunoController = async (request, response) => {
  try {
    const aluno = await getAlunoService(request.params.id);

    if (!aluno) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    response.status(200).json({
      aluno: aluno,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar aluno" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao buscar aluno",
      mensagem: error.message,
    });
  }
};

const atualizarAlunoController = async (request, response) => {
  try {
    const alunoAtualizado = await atualizarAlunoService(
      request.body,
      request.params.id
    );

    if (alunoAtualizado === 0) {
      return response.status(404).json({
        mensagem:
          "Aluno não foi encontrado para ser atualizado ou nenhum dado para atualizar.",
      });
    }
    response.status(200).json({
      mensagem: "Aluno atualizado com sucesso.",
      aluno: alunoAtualizado,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao atualizar aluno");
    response.status(500).json({
      erro: "Erro interno do servidor ao atualizar o aluno",
      mensagem: error.message,
    });
  }
};

const deleterAlunoController = async (request, response) => {
  try {
    const alunoDeletado = await deletarAlunoService(request.params.id);

    if (alunoDeletado === 0) {
      return response.status(404).json({
        mensagem: "O aluno não foi encontrado para ser deletado.",
      });
    }

    response.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log("Erro interno do servidor ao deletar aluno" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao tentar deletar aluno",
      mensagem: error.message,
    });
  }
};

module.exports = {
  createAlunoController,
  getAllAlunosController,
  getAlunoController,
  atualizarAlunoController,
  deleterAlunoController,
};
