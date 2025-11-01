// 1. Vai ser a aplicação -> Arquivo responsavel por iniciar todo o processo e arquitetar todo o processo tanto de rota como do express

// 1. Fui no package.json e coloquei type: modules (ModulosESM)
// 1. em vez do require eu utilizei o ModuloES(ESM) -> O que é isso?
// 1. Módulos ES são o sistema de módulos oficial e padronizado do JavaScript, fazer dessa forma faz com que o tipo de carregamento seja assíncrono (o CommonJS(CJS), require("express"), é sincrono e bloqueia a execução, além disso o ESM permite uma análise estática, e o CJS uma dinâmica (limita otimizações))
import express from "express";
import routes from "./routes.js"; // No ESM (módulos ES), o Node exige a extensão .js no import, a menos que haja uma configuração de bundler (como no Vite ou Babel).

// 1. Vamos organizar em classe, por mais que o node em si seja muito compatível com fazer tudo em funções, nesse sistema eu quero aprender a mexer em classes

class App {
  constructor() {
    this.server = express(); //1. isso equivale a const server = express()
    this.middlewares();
    this.routes();
    // 1. basicamente, colocamos os metodos de middlewares e routes para serem invocados/executados assim que o app for inicializado (new App()), então por rebote ele também inicia esses metodos de configuração do servidor
    // 4. Porque não inicializamos servidor direto aqui usando this.server.listen()? porque é interessante separar a camada lógica da camada de servidor, pois se precisarmos utilizar testes nessa classe app, não iremos iniciar o servidor automaticamente
  }

  //1. controle de acesso, controle de usuário, vai interceptar o express e a aplicação, aprova se a requisição passe para prox etapa ou não
  //1. é o local ideal para registrar middlewares globais ou de nível de aplicação (mas no quesito de autenticação e tal, ficara em um arquivo separado e aplicado nas rotas necessárias)
  middlewares() {
    this.server.use(express.json()); // 2. esse é o middlewares que vai permitir a gente trabalhar com json então precisamos fazer com que o server use o express.json()
  }

  routes() {
    // 3. aqui vão ficar as rotas, criaremos o arquivos de rotas
    // 3. podemos entender routes como um middleware também, arquiteturamente, as rotas são middlewares também só que elas direcionam para os lugares corretos
    this.server.use(routes);
  }
}

export default new App().server; // 1. exportamos o servidor já criado, ou seja iniciamos o app, ele ao ser instanciado executou os metodos que dá ao servidor os recursos necessários, contudo o server não está no ar ainda

// Quando usar o export default?
// Módulo Principal: O arquivo representa uma única entidade principal (um servidor, uma classe, uma configuração, um objeto Router).
// export default new App().server;

// export nomeado
// Múltiplas Funções: O arquivo é uma biblioteca de funções utilitárias ou tem várias exportações de dados/constantes.
// Múltiplos itens.
// export function somar(a, b) {
//   return a + b;
// }

// export const PI = 3.14159;

// export class Quadrado {
//   constructor(lado) {
//     this.lado = lado;
//   }
//   area() {
//     return this.lado * this.lado;
//   }
