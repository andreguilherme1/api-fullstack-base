const bcrypt = require("bcrypt");
let db;
function initDB(dbo) {
	db = dbo;
}

// Inserindo usuário no banco
function insertUser(req, res) {
	console.log('data',req);
  const { username, password, email } = req;

  console.log(username, password, email);
  bcrypt.hash(password, 10, (err, hash) => {
    console.log(hash);
    if (err) {
      return res.status(500).json({ error: "Erro ao criptografar a senha" });
    }

    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
      if (row) {
        return res
          .status(400)
          .json({ error: "Nome de usuário já está em uso" });
      }
      // Insere o usuário no banco de dados com a senha criptografada
      db.run(
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
        username,
        hash,
        email,
        (err) => {
          if (err) {
            console.error("Erro ao criar o usuário:", err);
            return res.status(500).json({ error: "Erro ao criar o usuário" });
          }

          res.status(201).json({ message: "Usuário registrado com sucesso" });
        },
      );
    });
  });
}

//  Selecionando usuário no banco
function selectUsers(res) {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Erro ao pegar usuários:", err);
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
    data = rows.filter((r) => delete r.password);
    res.json(data);
  });
}

function selectUserId(res, id) {
  db.all("SELECT * FROM users WHERE id = ?", id, (err, rows) => {
    if (err) {
      console.error("Erro ao pegar usuários:", err);
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
    data = rows.filter((r) => delete r.password);
    res.json(data);
  });
}

// Atualizando usuário no banco
function updateUser(req, res) {
  let { id, username, password, email } = req;
  bcrypt.hash(password, 10, (err, hash) => {
    console.log(hash);
    if (err) {
      return res.status(500).json({ error: "Erro ao criptografar a senha" });
    }

    // Insere o usuário no banco de dados com a senha criptografada
    db.run(
      `UPDATE users SET username = ?, password = ?, email = ? WHERE id =
	?`,
      [username, hash, email, id],
      function (err) {
        if (err) {
          console.error("Erro ao atualizar o usuário:", err);
          return res.status(500).json({ error: "Erro ao atualizar o usuário" });
        } else {
          console.log("usuario atualizado com sucesso");
          res.status(200).json({ message: "Usuário atualizado com sucesso" });
        }
      },
    );
  });
}

// Deletando no banco
function deleteUser(req, res) {
  let { id } = req;

  db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Erro ao deletar o usuário:", err);
      return res.status(500).json({ error: "Erro ao deletar o usuário" });
    } else {
      console.log("usuario deletado com sucesso");
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    }
  });
}

module.exports = {
	initDB,
  insertUser,
  selectUsers,
	selectUserId,
  updateUser,
  deleteUser,
};
