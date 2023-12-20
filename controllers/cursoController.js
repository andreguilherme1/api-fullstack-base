let db;
function initDB(dbo) {
  db = dbo;
}

// Inserindo no banco
function insertCurso(req, res) {
  console.log('data',req);
  const { nome, descricao, duracao_semanas } = req;

  console.log(nome, descricao, duracao_semanas);
    db.get("SELECT * FROM cursos WHERE nome = ?", nome, (err, row) => {
      if (row) {
        return res
          .status(400)
          .json({ error: "Nome de curso já está existe" });
      }
      // Insere o curso no banco
      db.run(
        "INSERT INTO cursos (nome, descricao, duracao_semanas) VALUES (?, ?, ?)",
        nome,
        descricao,
        duracao_semanas,
        (err) => {
          if (err) {
            console.error("Erro ao criar o curso:", err);
            return res.status(500).json({ error: "Erro ao criar o curso" });
          }

          res.status(201).json({ message: "Curso cadastrado com sucesso" });
        },
      );
    });
}

//  Selecionando no banco
function selectCursos(res) {
  db.all("SELECT * FROM cursos", (err, rows) => {
    if (err) {
      console.error("Erro ao pegar cursos:", err);
      return res.status(500).json({ error: "Erro ao listar cursos" });
    }
    data = rows;
    res.json(data);
  });
}

function selectCursoId(res, id) {
  db.all("SELECT * FROM cursos WHERE id = ?", id, (err, rows) => {
    if (err) {
      console.error("Erro ao pegar cursos:", err);
      return res.status(500).json({ error: "Erro ao listar curso" });
    }
    data = rows
    res.json(data);
  });
}

// Atualizando no banco
function updateCurso(req, res) {
  let { id, nome, descricao, duracao_semanas } = req;
    // Insere o curso no banco
    db.run(
      `UPDATE cursos SET nome = ?, descricao = ?, duracao_semanas = ? WHERE id =
  ?`,
      [nome, descricao, duracao_semanas, id],
      function (err) {
        if (err) {
          console.error("Erro ao atualizar o curso:", err);
          return res.status(500).json({ error: "Erro ao atualizar o curso" });
        } else {
          console.log("Curso atualizado com sucesso");
          res.status(200).json({ message: "Curso atualizado com sucesso" });
        }
      },
    );
}

// Deletando no banco
function deleteCurso(req, res) {
  let { id } = req;

  db.run(`DELETE FROM cursos WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Erro ao deletar o curso:", err);
      return res.status(500).json({ error: "Erro ao deletar o curso" });
    } else {
      console.log("Curso deletado com sucesso");
      res.status(200).json({ message: "Curso deletado com sucesso" });
    }
  });
}

module.exports = {
  initDB,
  insertCurso,
  selectCursos,
  selectCursoId,
  updateCurso,
  deleteCurso,
};
