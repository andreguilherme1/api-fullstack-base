// Criando tabela curso
function createTableCurso(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS cursos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE,
  descricao TEXT,
  duracao_semanas TEXT,
  n_aulas TEXT,
  nivel TEXT,
  foto TEXT
)`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela cursos:", err);
      } else {
        console.log("Tabela cursos criada com muito sucesso");
      }
    },
  );
}

module.exports = { createTableCurso };