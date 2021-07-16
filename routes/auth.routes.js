const router = require('express').Router();
const passport = require("passport")

const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const userController = require("../controllers/user.controller");
const flashMiddlewares = require("../middlewares/flash.middlewares");
//GET

//register
router.get("/registerUser", userController.register)
//login
router.get("/loginUser", flashMiddlewares, userController.login)
router.get("/logoutUser", userController.logout)

//Google OAuth
router.get('/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/google/callback', userController.doLoginGoogle)

//POST

//register
router.post("/registerUser", userController.doRegister)
//login
router.post("/loginUser", userController.doLogin)

module.exports = router;