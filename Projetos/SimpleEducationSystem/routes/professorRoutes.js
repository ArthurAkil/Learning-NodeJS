const express = require("express");
const router = express.Router();
const Professor = require("../models/Professor");
const Coordenador = require("../models/Coordenador");

// postar um professor
router.post("/cadastrar", async (request, response) => {
  try {
    const { nome, materia, CoordenadorId } = request.body;

    if (CoordenadorId) {
      const coordenadorExiste = await Coordenador.findByPk(CoordenadorId);
      if (!coordenadorExiste) {
        response.status(400).json({ mensage: "Id do coordenador não existe" });
      }

      const novoProfessor = await Professor.create({
        nome,
        materia,
        CoordenadorId,
      });

      response.status(201).json({
        mensagem: "Professor criado com sucesso.",
        professor: novoProfessor,
      });
    }
  } catch (error) {
    console.log("Erro ao cadastrar professor" + error);
    response.status(500).json({
      erro: "Erro do servidor ao cadastrar professor",
      mensagem: error,
    });
  }
});

// rota de pegar todos os professores
router.get("/", async (request, response) => {
  try {
    const professores = await Professor.findAll({
      include: [
        {
          model: Coordenador,
          attributes: ["nome"],
        },
      ],
    });
    response.status(200).json({ professores: professores });
  } catch (error) {
    console.log("Erro ao buscar professores" + error);
    response.status(500).json({
      erro: "Erro interno ao buscar os professores.",
      mensagem: error,
    });
  }
});

// rota pegar professor específico
router.get("/:id", async (request, response) => {
  try {
    const professor = await Professor.findByPk(request.params.id, {
      include: [
        {
          model: Coordenador,
          attributes: ["nome"],
        },
      ],
    });

    if (!professor) {
      return response
        .status(404)
        .json({ mensagem: "Professor não encontrado." });
    }

    response.status(200).json({ professor: professor });
  } catch (error) {
    console.log("Erro ao buscar professor específico" + error);
    response.status(500).json({
      error: "Erro interno ao buscar professor específico",
      mensagem: error,
    });
  }
});

// atualizar um professor
router.patch("/atualizar/:id", async (request, response) => {
  try {
    // normalmente o update retorna [numeros de alterações, alterações] -> mysql não suporta o returning true por tanto esse array "alterações" não é retornada, então trabalhamos com o número de alterações
    // update()	retorna ->Um array [número, registros] -> Usamos destructuring const [valor]
    const [linhasAfetadas] = await Professor.update(
      {
        nome: request.body.nome,
        materia: request.body.materia,
        CoordenadorId: request.body.CoordenadorId,
      },
      { where: { id: request.params.id } }
    );

    if (linhasAfetadas === 0) {
      return response.status(404).json({
        mensagem: "Professor não foi encontrado ou nenhum dado para atualizar",
      });
    }

    const professorAtualizado = await Professor.findByPk(request.params.id, {
      include: Coordenador,
    });

    response.status(200).json({
      mensagem: "Professor atualizado com sucesso",
      professor: professorAtualizado,
    });
  } catch (error) {
    console.log("Erro ao atualizar professor específico");
    response.status(500).json({
      erro: "Erro interno ao atualizar professor",
      mensagem: error,
    });
  }
});

// deletar professor
router.delete("/deletar/:id", async (request, response) => {
  try {
    const linhasExcluidas = await Professor.destroy({
      // o destroy por sua vez retorna também um valor, ao contrario do patch ele retorna um valor sem estar dentro de uma lista, um valor de forma isolada
      where: { id: request.params.id },
    });

    if (linhasExcluidas === 0) {
      return response.status(404).json({
        mensagem: "Não foi possível encontrar o professor para deletar",
      });
    }

    response.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log("Erro ao deletar professor");
    response.status(500).json({
      erro: "Erro interno do servidor ao tentar deletar o professor",
      mensagem: error,
    });
  }
});
