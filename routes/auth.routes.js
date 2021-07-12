const router = require('express').Router();

const userController = require("../controllers/user.controller");
const flashMiddlewares = require("../middlewares/flash.middlewares");
//GET 
router.get("/registerUser", userController.register)
router.get("/loginUser", flashMiddlewares, userController.login)
router.get("/logoutUser", userController.logout)

//POST
router.post("/registerUser", userController.doRegister)
router.post("/loginUser", userController.doLogin)

module.exports = router;