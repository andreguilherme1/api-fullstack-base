const bcrypt = require("bcrypt");

// Criando tabela usuários
function createTableUser(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE,
	password TEXT,
	email TEXT
)`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela users:", err);
      } else {
        console.log("Tabela users criada com muito sucesso");
				createUserAdmin(db)
      }
    },
  );
}

// Criando usuário admin
function createUserAdmin(db){

	let username = "admin"
	let password = "admin"
	let email = "admin@admin.com"

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({ error: "Erro ao criptografar a senha" });
		}

		db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
			if (row) {
				console.log("Usuário já existe")
				return
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
					}
				},
			);
		});
	});
}

module.exports = { createTableUser };
