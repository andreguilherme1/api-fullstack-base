var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var {authenticateToken} = require("../controllers/authController")


/* GET users listing. */
router.get("/", authenticateToken, function (req, res, next) {
	userController.selectUsers(res);
});

router.post("/register", (req, res) => {
  userController.insertUser(req.body, res);
});


router.get("/:id",authenticateToken, function (req, res, next) {
	const id = req.params.id;
	userController.selectUserId(res, id);
});


router.patch("/update",authenticateToken, (req, res) => {
  userController.updateUser(req.body, res);
});

router.delete("/delete",authenticateToken, (req, res) => {
  userController.deleteUser(req.body, res);
});

module.exports = router;
