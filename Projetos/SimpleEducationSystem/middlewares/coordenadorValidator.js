const validarCadastroCoordenador = async (request, response, next) => {
  const { nome, email } = request.body;
  const validarEmail = /\w+@(email|gmail|outlook|yahoo).com/;

  if (!nome || nome.trim() === "") {
    return response.status(400).json({
      mensagem: "O campo nome é obrigatorio e não pode ser vazio.",
    });
  }

  if (!email || email.trim() === "") {
    return response.status(400).json({
      mensagem: "O campo email é obrigatório e não pode ser vazio.",
    });
  }

  if (!validarEmail.test(email)) {
    return response.status(400).json({
      mensagem: "Digite um email na forma correta. Ex.: xxxx@seuemail.com",
    });
  }

  next();
};

module.exports = { validarCadastroCoordenador };
