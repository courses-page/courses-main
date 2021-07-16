const router = require("express").Router();
const routesRouter = require("../controllers/routes.controller")
const isAuth = require("../middlewares/isAuth.middleware")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//PROFILE

//Show
router.get("/myProfile", routesRouter.showProfile)
//Edit
router.get("/editMyProfile", routesRouter.editMyProfile)
router.post("/editMyProfile", routesRouter.doEditMyProfile)
router.get("/updatePassword", routesRouter.updatePassword)
router.post("/updatePassword", routesRouter.doUpdatePassword)

module.exports = router;
