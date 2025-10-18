const express = require("express");
const router = express.Router(); // ferramenta para agrupar rotas relacionadas em um único arquivo, é bom pra manter o app.js limpo
const Coordenador = require("../models/Coordenador");

const {
  validarCadastroCoordenador,
} = require("../middlewares/coordenadorValidator");

const {
  criarCoordenadorController,
  getAllCoordenadoresController,
  getCoordenadorController,
  atualizarCoordenadorController,
  deletarCoordenadorController,
} = require("../controller/coordenador.controller");

// criar coordenador
router.post(
  "/cadastro",
  validarCadastroCoordenador,
  async (request, response) => {
    await criarCoordenadorController(request, response);
  }
);

// ler todos os coordenadores
router.get("/", async (request, response) => {
  await getAllCoordenadoresController(request, response);
});

// buscar coordenador específico
router.get("/:id", async (request, response) => {
  await getCoordenadorController(request, response);
});

// Atualizar um coordenador específico
router.patch(
  "/atualizar/:id",
  validarCadastroCoordenador,
  async (request, response) => {
    await atualizarCoordenadorController(request, response);
  }
);

// deletar um coordenador
router.delete("/deletar/:id", async (request, response) => {
  await deletarCoordenadorController(request, response);
});

module.exports = router;
