const Coordenador = require("../models/Coordenador");

const criarCoordenadorService = async (data) => {
  const { nome, email } = data;

  const novoCoordenador = await Coordenador.create({
    nome,
    email,
  });

  return novoCoordenador;
};

const getAllCoordenadoresService = async () => {
  const coordenadores = await Coordenador.findAll();

  return coordenadores;
};

const getCoordenadorService = async (id) => {
  const coordenador = await Coordenador.findByPk(id);

  return coordenador;
};

const atualizarCoordenadorService = async (body, id) => {
  const { nome, email } = body;

  const [linhasAlteradas] = await Coordenador.update(
    {
      nome,
      email,
    },
    { where: { id: id } }
  );

  if (linhasAlteradas === 0) {
    return linhasAlteradas;
  }

  const coordenadorAtualizado = await Coordenador.findByPk(id);

  return coordenadorAtualizado;
};

const deletarCoordenadorService = async (id) => {
  const coordenador = await Coordenador.destroy({
    where: { id: id },
  });

  return coordenador;
};

module.exports = {
  criarCoordenadorService,
  getAllCoordenadoresService,
  getCoordenadorService,
  atualizarCoordenadorService,
  deletarCoordenadorService,
};
