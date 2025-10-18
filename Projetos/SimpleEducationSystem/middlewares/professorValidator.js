const Coordenador = require("../models/Coordenador");

const validarCadastroProfessor = async (request, response, next) => {
  const { nome, materia, CoordenadorId } = request.body;

  if (!nome || nome.trim() === "") {
    return response.status(400).json({
      mensagem: "O campo nome é obrigatorio e não pode ser vazio",
    });
  }

  if (!materia || materia.trim() === "") {
    return response.status(400).json({
      mensagem: "O campo materia é obrigatório e não pode ser vazio.",
    });
  }

  if (!CoordenadorId) {
    return response.status(400).json({
      mensagem: "Todo professor deve estar ligado a um coordenador",
    });
  } else {
    const coordenadorExiste = await Coordenador.findByPk(Coordenador);

    if (!coordenadorExiste) {
      return response.status(400).json({
        mensagem: "CoordenadorId fornecido não é válido.",
      });
    }

    next();
  }
};

module.exports = { validarCadastroProfessor };
