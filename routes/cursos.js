var express = require("express");
var router = express.Router();
var cursoController = require("../controllers/cursoController");
var {authenticateToken} = require("../controllers/authController")


/* GET cursos listing. */
router.get("/", authenticateToken, function (req, res, next) {
  cursoController.selectCursos(res);
});

router.post("/register", authenticateToken,(req, res) => {
  cursoController.insertCurso(req.body, res);
});


router.get("/:id",authenticateToken, function (req, res, next) {
  const id = req.params.id;
  cursoController.selectCursoId(res, id);
});


router.patch("/update",authenticateToken, (req, res) => {
  cursoController.updateCurso(req.body, res);
});

router.delete("/delete",authenticateToken, (req, res) => {
  cursoController.deleteCurso(req.body, res);
});

module.exports = router;