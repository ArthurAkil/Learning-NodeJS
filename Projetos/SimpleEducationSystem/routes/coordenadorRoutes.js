const express = require("express");
const router = express.Router(); // ferramenta para agrupar rotas relacionadas em um único arquivo, é bom pra manter o app.js limpo
const Coordenador = require("../models/Coordenador");

// criar coordenador
router.post("/cadastro", async (request, response) => {
  try {
    const novoCoordenador = await Coordenador.create({
      nome: request.body.nome,
      email: request.body.email,
    });

    // 201 codigo de criado com sucesso
    response.status(201).json({
      mensagem: "Coordenador cadastrado",
      coordenador: novoCoordenador,
    });
  } catch (error) {
    console.log("Error ao cadastrar Coordenador" + error);
    // 500 codigo de error do servidor
    response.status(500).json({
      error: "Error ao cadastrar coordenador",
      detalhes: error,
    });
  }
});

// ler todos os coordenadores
router.get("/", async (request, response) => {
  try {
    const coordenadores = await Coordenador.findAll();
    // 200 codigo de sucesso
    response.status(200).json(coordenadores);
  } catch (error) {
    console.log("Error ao buscar coordenadores");
    response.status(500).json({
      error: "Error ao buscar coordenadores",
      detalhes: error,
    });
  }
});

// buscar coordenador específico
router.get("/:id", async (request, response) => {
  try {
    const coordenador = await Coordenador.findByPk(request.params.id);

    if (!coordenador) {
      // 404 codigo not found
      return response
        .status(404)
        .json({ mensagem: "Coordenador não encontrado" });
    }

    // 200 codigo de sucesso achou
    response.status(200).json(coordenador);
  } catch (error) {
    console.log("Error ao buscar o coordenador pelo ID");
    response.status(500).json({
      erro: "Erro ao buscar coordenador específico",
      detalhes: error,
    });
  }
});

// Atualizar um coordenador específico
router.patch("/atualizar/:id", async (request, response) => {
  try {
    // o update retorna uma lista onde o primeiro elemento é o número de linhas afetadas
    const [linhas] = await Coordenador.update(
      {
        nome: request.body.nome,
        email: request.body.email,
      },
      { where: { id: request.params.id } }
    );

    if (linhas === 0) {
      return response.status(404).json({
        mesagem: "Coordenador não encontrado ou nenhum dado para atualizar",
      });
    }

    const coordenador = await Coordenador.findByPk(request.params.id);

    response.status(200).json({
      mensagem: "Coordenador atualizado",
      coordenador: coordenador,
    });
  } catch (error) {
    console.log("Não foi possível atualizar esse coordenador");
    response.status(500).json({
      error: "Não foi possivel ataulizar este coordenador",
      mensagem: error,
    });
  }
});

// deletar um coordenador
router.delete("/deletar/:id", async (request, response) => {
  try {
    const linhasExcluidas = await Coordenador.destroy({
      where: { id: request.params.id },
    });

    if (linhasExcluidas === 0) {
      return response.status(404).json({
        mensagem: "Coordenador não encontrado",
      });
    }

    response.status(200).send("Coordenador excluido");
  } catch (error) {
    response.status(500).json({
      mensagem: "Não foi possível deletar esse coordenador",
      detalhes: error,
    });
  }
});

module.exports = router;
