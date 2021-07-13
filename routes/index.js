const router = require("express").Router();
const routesRouter = require("../controllers/routes.controller")
const isAuth = require("../middlewares/isAuth.middleware")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/myProfile", routesRouter.showProfile)

module.exports = router;
