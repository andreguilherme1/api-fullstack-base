let db;
function initDB(dbo) {
	db = dbo;
}

// Inserindo no banco
function insertProduct(req, res) {
	console.log('data',req);
  const { name, price, quantity } = req;

  console.log(name, price, quantity);
    db.get("SELECT * FROM products WHERE name = ?", name, (err, row) => {
      if (row) {
        return res
          .status(400)
          .json({ error: "Nome de produto já está existe" });
      }
      // Insere o produto no banco
      db.run(
        "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
        name,
        price,
        quantity,
        (err) => {
          if (err) {
            console.error("Erro ao criar o produto:", err);
            return res.status(500).json({ error: "Erro ao criar o produto" });
          }

          res.status(201).json({ message: "Produto cadastrado com sucesso" });
        },
      );
    });
}

//  Selecionando no banco
function selectProducts(res) {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("Erro ao pegar produtos:", err);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
    data = rows;
    res.json(data);
  });
}

function selectProductId(res, id) {
  db.all("SELECT * FROM products WHERE id = ?", id, (err, rows) => {
    if (err) {
      console.error("Erro ao pegar produtos:", err);
      return res.status(500).json({ error: "Erro ao listar produto" });
    }
    data = rows
    res.json(data);
  });
}

// Atualizando no banco
function updateProduct(req, res) {
  let { id, name, price, quantity } = req;
    // Insere o produto no banco
    db.run(
      `UPDATE products SET name = ?, price = ?, quantity = ? WHERE id =
	?`,
      [name, price, quantity, id],
      function (err) {
        if (err) {
          console.error("Erro ao atualizar o produto:", err);
          return res.status(500).json({ error: "Erro ao atualizar o produto" });
        } else {
          console.log("Produto atualizado com sucesso");
          res.status(200).json({ message: "Produto atualizado com sucesso" });
        }
      },
    );
}

// Deletando no banco
function deleteProduct(req, res) {
  let { id } = req;

  db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Erro ao deletar o produto:", err);
      return res.status(500).json({ error: "Erro ao deletar o produto" });
    } else {
      console.log("Produto deletado com sucesso");
      res.status(200).json({ message: "Produto deletado com sucesso" });
    }
  });
}

module.exports = {
	initDB,
  insertProduct,
  selectProducts,
	selectProductId,
  updateProduct,
  deleteProduct,
};
