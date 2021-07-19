const router = require("express").Router();
const routesRouter = require("../controllers/routes.controller")
const isAuth = require("../middlewares/isAuth.middleware")
const fileUploader = require('../config/cloudinary.config')

/* GET home page */
router.get("/", routesRouter.listCourses)

//PROFILE
router.get("/activate/:token", routesRouter.activate)

//Show
router.get("/myProfile", routesRouter.showProfile)
router.get("/courseDetail/:id", routesRouter.showCourseDetail)

//Edit
router.get("/editMyProfile", routesRouter.editMyProfile)
router.post("/editMyProfile", routesRouter.doEditMyProfile)
router.get("/updatePassword", routesRouter.updatePassword)
router.post("/updatePassword", routesRouter.doUpdatePassword)
router.get("/upgradeAccount", routesRouter.doUpgradeAccount)

//Cloudinary 
router.post("/updateProfilePic", fileUploader.single("profilePicture"), routesRouter.doUpdateProfilePic)

module.exports = router;
