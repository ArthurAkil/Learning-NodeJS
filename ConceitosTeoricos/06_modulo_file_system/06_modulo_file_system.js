// Módulo de file system

// Um dos módulos mais utilizados

// Ele serve para trabalhar com arquivos e diretórios

// Já é incluso no node, ou seja, não precisamos instalar

// Aqui importamos o método em uma variavel, importamos o read e o write
let { readFile, writeFile } = require("fs");

readFile("arquivo.txt", "utf8", (error, texto) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log(texto);
  }
});

writeFile("arquivo.txt", "texto que será inserido pelo write file", (error) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Escreveu a mensagem com sucesso");
  }
});

// rodar o código: abrir a pasta 6 no terminal e digitar:
// node 06_modulo_file_system.js
