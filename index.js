const express = require("express");
const bodyParser = require("body-parser");

const {
  getAll,
  getOneById,
  create,
  update,
  deleteOne,
} = require("./controllers/todoController");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", getAll);
app.post("/", create);
app.get("/:id", getOneById);
app.delete("/:id", deleteOne);
app.patch("/:id", update);

app.use((req, res) => {
  res.end("Unknown endpoint");
});

app.listen(3000, () => {
  console.log("Server started: http://localhost:3000");
});
