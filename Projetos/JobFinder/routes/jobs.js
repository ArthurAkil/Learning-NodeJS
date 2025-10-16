const express = require("express"); // precisamos do express pois ele quem cuide de rotas

const router = express.Router(); // precisamos do objeto de rotas do express

const Job = require("../models/Job"); // e precisamos do model que criamos

router.get("/test", (req, res) => {
  res.send("Deu certo");
});

router.get("/add", (req, resp) => {
  resp.render("add");
});

// adicionar job POST
router.post("/add", (request, response) => {
  // para adicionar um job precisaremos de um corpo com todos os dados do Job

  let { title, salary, company, description, email, new_job } = request.body;

  // insert objetos
  Job.create({
    //isso é uma promesa, podemos usar o then
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => response.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
