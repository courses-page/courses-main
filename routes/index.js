const router = require("express").Router();
const routesRouter = require("../controllers/routes.controller")
const isAuth = require("../middlewares/isAuth.middleware")
const fileUploader = require('../config/cloudinary.config')

/* GET home page */
router.get("/", routesRouter.listCourses)

//PROFILE

//Show
router.get("/myProfile", routesRouter.showProfile)
//Edit
router.get("/editMyProfile", routesRouter.editMyProfile)
router.post("/editMyProfile", routesRouter.doEditMyProfile)
router.get("/updatePassword", routesRouter.updatePassword)
router.post("/updatePassword", routesRouter.doUpdatePassword)
router.get("/upgradeAccount", routesRouter.doUpgradeAccount)
//Cloudinary 
router.post("/updateProfilePic", fileUploader.single("profilePicture"), routesRouter.doUpdateProfilePic)

module.exports = router;
