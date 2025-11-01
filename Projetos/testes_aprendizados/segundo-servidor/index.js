// Arquivo de exemplo apenas para ter uma introdução de como os verbos http funcionam, o real server está em src (lá está realmente concentrado a lógica de todo backend)

const express = require("express");
const server = express();
const PORT = 8080;

server.use(express.json());

let customers = [
  { id: 1, name: "Arthur", curso: "ADS" },
  { id: 2, name: "Thiago", curso: "Psicologia" },
  { id: 3, name: "Lucas", curso: "Odonto" },
];

// crud simples utilizando uma lista predefinida
// lista todos
server.get("/customers", async (req, res) => {
  try {
    await res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.mesage });
  }
});

// pega um específico
server.get("/customers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const customer = customers.find((item) => item.id === id);
    const status = customer ? 200 : 404;

    return res.status(status).json({ customer: customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.mesage });
  }
});

// criar customer
server.post("/customers", async (req, res) => {
  try {
    const { nome, curso } = req.body;

    const nextId = customers[customers.length - 1].id + 1;
    const customer = { id: nextId, name: nome, curso: curso };
    customers.push(customer);

    res.status(201).json({ customer: customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.mesage });
  }
});

// atualizar
server.put("/customers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, curso } = req.body;
    const index = customers.findIndex((item) => item.id === id);

    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id, name, curso };
    }

    return res.status(status).json({ customer: customers[index] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.mesage });
  }
});

//exclusão
server.delete("/customers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = customers.findIndex((item) => item.id === id);

    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json({ customers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.mesage });
  }
});

// abertura do server
server.listen(PORT, () => {
  console.log(`Servidor aberto na porta http://localhost:${PORT}`);
});
