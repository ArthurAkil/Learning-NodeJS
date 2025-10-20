// Modulo http

// Outro modulo muito utilizado, para fazer comunicação via http

// O modulo já vem com o node

// Pode criar um servidor que serve páginas web para nós

const { createServer } = require("http");

// criamos uma variavel server que recebe o metodo createServer
// o metodo deve receber uma request e response como parâmetros
// depois construimos a head (200, código que deu tudo certo, cabeçalho - informar o que o server está recebendo, html, json no content type), o resto do body, e finalizamos
let server = createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.write(`
        <h1>Hello word</h1>
        <p>Primeira página com Node.js</p>`);
  response.end();
});

// informamos que o serve fique alocado na porta 8000
server.listen(8000);

console.log("Ouvindo a porta 8000");

// http://localhost:8000/
// mini servidor web
