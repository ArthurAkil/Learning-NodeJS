// Parte de importação
import express from "express";
import routes from "./routes";

// Classe onde vai conter a lógica
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  //camada que adicionamos entre o express e entre a aplicação, camada de interceptação, podendo aprovar a requisição ou não
  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// Tudo que vamos exportar que outros arquivos vão usar, só preciso do server do app
const app = new App();

export default app.server;
