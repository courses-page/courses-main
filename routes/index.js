const router = require("express").Router();
const routesRouter = require("../controllers/routes.controller")
const isAuth = require("../middlewares/isAuth.middleware")
const fileUploader = require('../config/cloudinary.config')

/* GET home page */
router.get("/", routesRouter.landingPage)
router.get("/coursesOffer", routesRouter.listCourses)

//PROFILE
router.get("/activate/:token", routesRouter.activate)

//Show
router.get("/myProfile", routesRouter.showProfile)
router.get("/courseDetail/:id", routesRouter.showCourseDetail)
router.get("/companyDetail/:id", routesRouter.showCompanyDetail)

//Edit
router.get("/editMyProfile", routesRouter.editMyProfile)
router.post("/editMyProfile", routesRouter.doEditMyProfile)
router.get("/updatePassword", routesRouter.updatePassword)
router.post("/updatePassword", routesRouter.doUpdatePassword)
router.get("/upgradeAccount", routesRouter.doUpgradeAccount)
router.get("/deleteAccount", routesRouter.doDeleteAccount)

//Course
router.get("/publishCourse", routesRouter.publishCourse)
router.post("/publishCourse",fileUploader.single("imageUrl"), routesRouter.doPublishCourse)
router.get("/deletecourse/:id", routesRouter.deleteCourse)
router.get("/courseAddress/:id", routesRouter.courseAddress)

//Cloudinary 
router.post("/updateProfilePic", fileUploader.single("profilePicture"), routesRouter.doUpdateProfilePic)

//Subscribe
router.get("/subscribe/:courseId/:userId", routesRouter.subscribe)
router.get("/unsubscribe/:courseId/:userId", routesRouter.unSubscribe)
router.get("/subscribe/:courseId/", routesRouter.cantSubscribe)

module.exports = router;
