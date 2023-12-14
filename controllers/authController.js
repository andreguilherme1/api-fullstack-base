const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../secret");
var db;
function initDB(dbo) {
  db = dbo;
}

// Middleware para autenticação JWT
function authenticateToken(req, res, next) {
  const token = req.rawHeaders.find((item) => item.includes("Bearer"));

  if (!token.split(" ")[1]) {
    console.log(token);
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token.split(" ")[1], secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;
    next();
  });
}

function authLogin(res, req, username, password) {
  db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao verificar o usuário" });
    }

    if (!row) {
      return res.status(401).json({ error: "Nome de usuário não encontrado" });
    }

    // Compara a senha fornecida com a senha armazenada
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao comparar senhas" });
      }

      if (!result) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // Gera um token JWT com expiração de 1 hora
      const token = jwt.sign({ userId: row.id }, secret, {
        expiresIn: "1h",
      });

      // Armazena o token na sessão (usando express-session)
      req.session.token = token;

      res.json({ message: "Login bem-sucedido", token });
    });
  });
}

module.exports = { authLogin, authenticateToken, initDB };
