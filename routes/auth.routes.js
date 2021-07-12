const router = require('express').Router();

const userController = require("../controllers/user.controller");
const companyController = require("../controllers/company.controller");
const flashMiddlewares = require("../middlewares/flash.middlewares");
//GET 
router.get("/registerUser", userController.register)
router.get("/registerCompany", companyController.register)
router.get("/loginUser", flashMiddlewares, userController.login)
router.get("/logoutUser", userController.logout)
router.get("/loginCompany", flashMiddlewares, companyController.login)

//POST
router.post("/registerUser", userController.doRegister)
router.post("/registerCompany", companyController.doRegister)
router.post("/loginUser", userController.doLogin)
router.post("/loginCompany", companyController.doLogin)

module.exports = router;