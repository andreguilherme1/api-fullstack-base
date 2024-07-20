var express = require("express");
var router = express.Router();
var cursoController = require("../controllers/cursoController");
var {authenticateToken} = require("../controllers/authController")


// (GET) Buscar cursos
router.get("/", authenticateToken, function (req, res, next) {
  cursoController.selectCursos(res);
});

// (POST) Registrar um novo curso
router.post("/register", authenticateToken,(req, res) => {
  cursoController.insertCurso(req.body, res);
});

// (GET) Buscar um usuário pelo ID
router.get("/:id",authenticateToken, function (req, res, next) {
  const id = req.params.id;
  cursoController.selectCursoId(res, id);
});

// (PATCH) Atualizar um curso
router.patch("/update",authenticateToken, (req, res) => {
  cursoController.updateCurso(req.body, res);
});

// (DELETE) Deletar um curso
router.delete("/delete",authenticateToken, (req, res) => {
  cursoController.deleteCurso(req.body, res);
});

module.exports = router;