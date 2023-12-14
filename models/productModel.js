// Criando tabela
function createTableProduct(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT UNIQUE,
	price TEXT,
	quantity TEXT
)`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela products:", err);
      } else {
        console.log("Tabela products criada com muito sucesso");
      }
    },
  );
}

module.exports = { createTableProduct };
