var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var {authenticateToken} = require("../controllers/authController")


// (GET) Listar usuários.
router.get("/", authenticateToken, function (req, res, next) {
  userController.selectUsers(res);
});

// (POST) Registrar um novo usuário
router.post("/register", (req, res) => {
  userController.insertUser(req.body, res);
});

// (GET) Buscar um usuário pelo ID
router.get("/:id",authenticateToken, function (req, res, next) {
  const id = req.params.id;
  userController.selectUserId(res, id);
});

// (PATCH) Atualizar um usuário
router.patch("/update",authenticateToken, (req, res) => {
  userController.updateUser(req.body, res);
});

// (DELETE) Deletar um usuário
router.delete("/delete",authenticateToken, (req, res) => {
  userController.deleteUser(req.body, res);
});

module.exports = router;
