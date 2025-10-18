const express = require("express");
const router = express.Router();
const {
  createAlunoController,
  getAllAlunosController,
  getAlunoController,
  atualizarAlunoController,
  deleterAlunoController,
} = require("../controller/aluno.controller");

const validarCadastroAluno = require("../middlewares/alunoValidator");

// como usar um middleware?, colocamos como um dos argumentos da função router.metodohttp("caminho", validator, função)
// se a validação falha, envia a resposta 400 e nucna chama a rota principal

// rota da cadastro de aluno
router.post("/cadastrar", validarCadastroAluno, async (request, response) => {
  await createAlunoController(request, response);
});

// rota get todos os alunos
router.get("/", async (request, response) => {
  await getAllAlunosController(request, response);
});

// get aluno específico
router.get("/:id", async (request, response) => {
  await getAlunoController(request, response);
});

// atualizar / patch um aluno especifico
router.patch(
  "/atualizar/:id",
  validarCadastroAluno,
  async (request, response) => {
    await atualizarAlunoController(request, response);
  }
);

// deletar aluno específico
router.delete("/deletar/:id", async (request, response) => {
  await deleterAlunoController(request, response);
});

module.exports = router;
