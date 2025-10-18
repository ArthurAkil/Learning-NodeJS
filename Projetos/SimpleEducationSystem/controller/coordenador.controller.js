const {
  criarCoordenadorService,
  getAllCoordenadoresService,
  getCoordenadorService,
  atualizarCoordenadorService,
  deletarCoordenadorService,
} = require("../service/coordenador.service");

const criarCoordenadorController = async (request, response) => {
  try {
    const novoCoordenador = await criarCoordenadorService(request.body);

    response.status(200).json({
      mensagem: "Coordenador criado com sucesso.",
      coordenador: novoCoordenador,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao cadastrar coordenador" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao cadastrar coordenador",
      mensagem: error.message,
    });
  }
};

const getAllCoordenadoresController = async (request, response) => {
  try {
    const coordenadores = await getAllCoordenadoresService();

    response.status(200).json({
      coordenadores: coordenadores,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar coordenadores" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao cadastrar coordenador",
      mensagem: error.message,
    });
  }
};

const getCoordenadorController = async (request, response) => {
  try {
    const coordenador = await getCoordenadorService(request.params.id);

    if (!coordenador) {
      return response.status(404).json({
        mensagem: "Coordenador não foi encontrado.",
      });
    }

    response.status(200).json({
      coordenador: coordenador,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar o coordenador" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao buscar o coordenador",
      mensagem: error.message,
    });
  }
};

const atualizarCoordenadorController = async (request, response) => {
  try {
    const coordenadorAtualizado = await atualizarCoordenadorService(
      request.body,
      request.params.id
    );

    if (coordenadorAtualizado === 0) {
      return response.status(404).json({
        mensagem:
          "Coordenador não foi encontrado ou nenhum dado foi atualizado.",
      });
    }

    response.status(200).json({
      coordenador: coordenadorAtualizado,
    });
  } catch (error) {
    console.log(
      "Erro interno do servidor ao alterar dados do coordenador" + error
    );
    response.status(500).json({
      erro: "Erro interno do servidor ao alterar dados do coordenador",
      mensagem: error.message,
    });
  }
};

const deletarCoordenadorController = async (request, response) => {
  try {
    const coordenador = await deletarCoordenadorService(request.params.id);

    if (coordenador === 0) {
      return response.status(404).json({
        mensagem: "O coordenador não foi encontrado para ser deletado.",
      });
    }

    response.status(200).send();
  } catch (error) {
    console.log("Erro interno do servidor ao deletar o coordenador" + error);
    response.status(500).json({
      erro: "Erro interno do servidor ao deletar o coordenador",
      mensagem: error.message,
    });
  }
};

module.exports = {
  criarCoordenadorController,
  getAllCoordenadoresController,
  getCoordenadorController,
  atualizarCoordenadorController,
  deletarCoordenadorController,
};
