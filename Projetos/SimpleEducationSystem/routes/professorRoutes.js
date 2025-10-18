const express = require("express");
const router = express.Router();
const Professor = require("../models/Professor");

const {
  validarCadastroProfessor,
} = require("../middlewares/professorValidator");

const {
  createProfessorController,
  getAllProfessorsController,
  getProfessorController,
  atualizarProfessorController,
  deletarProfessorController,
} = require("../controller/professor.controller");

// postar um professor
router.post(
  "/cadastrar",
  validarCadastroProfessor,
  async (request, response) => {
    await createProfessorController(request, response);
  }
);

// rota de pegar todos os professores
router.get("/", async (request, response) => {
  await getAllProfessorsController(request, response);
});

// rota pegar professor específico
router.get("/:id", async (request, response) => {
  await getProfessorController(request, response);
});

// atualizar um professor
router.patch(
  "/atualizar/:id",
  validarCadastroProfessor,
  async (request, response) => {
    // normalmente o update retorna [numeros de alterações, alterações] -> mysql não suporta o returning true por tanto esse array "alterações" não é retornada, então trabalhamos com o número de alterações
    // update()	retorna ->Um array [número, registros] -> Usamos destructuring const [valor]
    await atualizarProfessorController(request, response);
  }
);

// deletar professor
router.delete("/deletar/:id", async (request, response) => {
  await deletarProfessorController(request, response);
});

module.exports = router;
