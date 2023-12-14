var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var {authenticateToken} = require("../controllers/authController")


/* GET products listing. */
router.get("/", authenticateToken, function (req, res, next) {
	productController.selectProducts(res);
});

router.post("/register", authenticateToken,(req, res) => {
  productController.insertProduct(req.body, res);
});


router.get("/:id",authenticateToken, function (req, res, next) {
	const id = req.params.id;
	productController.selectProductId(res, id);
});


router.patch("/update",authenticateToken, (req, res) => {
  productController.updateProduct(req.body, res);
});

router.delete("/delete",authenticateToken, (req, res) => {
  productController.deleteProduct(req.body, res);
});

module.exports = router;
