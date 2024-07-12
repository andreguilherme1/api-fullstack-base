var express = require('express');
var router = express.Router();
var authController = require("../controllers/authController")

// GET home page.
router.get('/', function(req, res, next) {
  res.json({ title: 'Wellcome to api fullstack' });
});

// GET home page.
router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  authController.authLogin(res, req, username, password);
});

// Rota de logout
router.get('/logout', (req, res) => {
  // Remove o token JWT do cookie (ou do armazenamento local)
  res.clearCookie('token'); // 'token' é o nome do cookie onde o token está armazenado

  // Responde com uma mensagem de sucesso
  res.json({ message: 'Logout bem-sucedido' });
});

module.exports = router;
