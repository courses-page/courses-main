const router = require('express').Router();

const userController = require("../controllers/user.controller");
const companyController = require("../controllers/company.controller")

//GET 
router.get("/registerUser", userController.register)
router.get("/registerCompany", companyController.register)
router.get("/login", userController.login)

//POST
router.post("/registerUser", userController.doRegister)
router.post("/registerCompany", companyController.doRegister)
//router.post("/login", userController.doLogin)

module.exports = router;