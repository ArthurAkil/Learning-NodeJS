const express = require("express");
const router = express.Router();
const Aluno = require("../models/Aluno");
const Professor = require("../models/Professor");
const Coordenador = require("../models/Coordenador");

// validators
const validarCadastroAluno = require("../middlewares/alunoValidator");

// como usar um middleware?, colocamos como um dos argumentos da função router.metodohttp("caminho", validator, função)
// se a validação falha, envia a resposta 400 e nucna chama a rota principal

// rota da cadastro de aluno
router.post("/cadastrar", validarCadastroAluno, async (request, response) => {
  try {
    const { nome, matricula, ProfessorId } = request.body;

    const alunoNovo = await Aluno.create({
      nome,
      matricula,
      ProfessorId: ProfessorId || null, //garantimos que o campo professorId deve possuir um id ou pode ser nulo
    });

    response.status(201).json({
      mensagem: "Aluno criado com sucesso",
      aluno: alunoNovo,
    });
  } catch (error) {
    console.log("Erro interno do servidor ao cadastrar aluno");
    response.status(500).json({
      erro: "Erro interno do servidor ao cadastrar aluno",
      mensagem: error,
    });
  }
});

// rota get todos os alunos
router.get("/", async (request, response) => {
  try {
    const alunos = await Aluno.findAll({
      // todos alunos e inclua também
      include: [
        {
          // o respectivo professor desse aluno
          model: Professor,
          //   quero os atributos dessa inclusão no professor: nome e materia
          attributes: ["nome", "materia"],
          //   e de professor inclua o coordenador dele
          include: [
            {
              model: Coordenador,
              //   quero os atributos de coordenador: nome
              attributes: ["nome"],
            },
          ],
        },
      ],
    });
    response.status(200).json({ alunos: alunos });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar alunos");
    response.status(500).json({
      erro: "Erro interno ao buscar alunos",
      mensagem: error,
    });
  }
});

// get aluno específico
router.get("/:id", async (request, response) => {
  try {
    const aluno = await Aluno.findByPk(request.params.id, {
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

    response.status(200).json({ aluno: aluno });
  } catch (error) {
    console.log("Erro interno do servidor ao buscar aluno");
    response.status(500).json({
      erro: "Erro interno ao buscar aluno",
      mensagem: error,
    });
  }
});

// atualizar / patch um aluno especifico
router.patch(
  "/atualizar/:id",
  validarCadastroAluno,
  async (request, response) => {
    try {
      const { nome, matricula, ProfessorId } = request.body;

      const [linhasAfetadas] = await Aluno.update(
        {
          nome,
          matricula,
          ProfessorId,
        },
        { where: { id: request.params.id } }
      );

      if (linhasAfetadas === 0) {
        return response.status(404).json({
          mensagem:
            "Aluno não foi encontrado para ser atualizado ou nenhum dado para atualizar",
        });
      }

      const alunoAtualizado = await Aluno.findByPk(request.params.id, {
        include: Professor,
      });

      response.status(200).json({
        mensagem: "Aluno atualizado com sucesso",
        aluno: alunoAtualizado,
      });
    } catch (error) {
      console.log("Erro interno do servidor ao atualizar aluno específico");
      response.status(500).json({
        erro: "Erro interno do servidor ao atualizar aluno",
        mensagem: error,
      });
    }
  }
);

// deletar aluno específico
router.delete("/deletar/:id", async (request, response) => {
  try {
    const linhasDeletadas = await Aluno.destroy({
      where: { id: request.params.id },
    });

    if (linhasDeletadas === 0) {
      return response.status(404).json({
        mensagem: "O aluno não encontrado para ser deletado.",
      });
    }

    response.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log("Erro interno do servidor ao tentar deletar aluno");
    response.status(500).json({
      erro: "Erro interno do servidor ao tentar deletar usuário",
      mensagem: error,
    });
  }
});
