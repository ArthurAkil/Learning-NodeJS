import app from "./app.js"; // 4. importamos o app já instanciado e mandando as configs do server já pronto para ir ao ar
// No ESM (módulos ES), o Node exige a extensão .js no import, a menos que haja uma configuração de bundler (como no Vite ou Babel).
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Acesse: http://localhost:${PORT}/`);
  // 4. colocamos o server no ar
});
