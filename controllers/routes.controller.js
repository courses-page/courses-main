const User = require("../models/User.model");
const Course = require("../models/Course.model");
const Subscription = require("../models/Subscription.model");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt")
const fileUploader = require('../config/cloudinary.config')

module.exports.landingPage = (req, res, next) => {
    if (req.user) {
        res.redirect("/coursesOffer")
    } else {
        res.render("landingPage")
    }
}

module.exports.showProfile = (req, res, next) => {
    const currentUserId = req.user.id
    
   if (req.user.isCompany) {
    User.findById(currentUserId)
    .populate("courses")
    .then ((company) => {
        const courses = company.courses
        console.log(courses)
        res.render("myProfile", {coursesArr: courses})
    })
    .catch(next)
   } else {
    User.findById(currentUserId)
    .populate([
        {
          path: 'subscriptions',
          model: 'Subscription',
		  populate: {
		    path: 'courseId',
			model: 'Course',
		  }
        },
      ])
    .then ((user) => {
        const subscriptions = user.subscriptions
        res.render("myProfile", {subscriptionsArr: subscriptions})
    })
    .catch(next)
   }
}


module.exports.editMyProfile = (req, res, next) => {
    res.render("editMyProfile")
}

module.exports.doEditMyProfile = (req, res, next) => {

    User.findByIdAndUpdate(req.user.id, req.body, {runValidators: true})
    .then(() => {
        console.log("BODYYY: ", req.body)
        res.redirect("/myProfile")
    })
    .catch((e) => {
        if (e.code == 11000) {
            let errorMessageObj = {errorMessage: {email: "That email is already in use, choose another!"}}
            res.render("editMyProfile", errorMessageObj)
        } else if (e instanceof mongoose.Error.ValidationError) {
            res.render("editMyProfile", { user: req.body, errors: e.errors })
        } else {
        next(e)
        }
    })
}

module.exports.updatePassword = (req, res, next) => {
    res.render("updatePassword")
}

module.exports.doUpdatePassword = (req, res, next) => {
    let { password } = req.body;

    let updatedPassword
    if (password.length > 7) {
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        .then((hash) => {
            updatedPassword = hash;
            User.findByIdAndUpdate(req.user.id, {password: updatedPassword})
                .then(() => {
                    res.redirect("/myProfile")
                })
                    .catch(next)
                })
        .catch(e => console.error(e))
    } else {
        res.redirect("/updatePassword")
    }
}

module.exports.doUpdateProfilePic = (req, res, next) => {
    if(req.file){
    User.findByIdAndUpdate(req.user.id, {imageUrl: req.file.path})
        .then(()=>{
            res.redirect("/myProfile")
        })
        .catch(next)
    }
    else{
        res.redirect("/myProfile")
    }
}

module.exports.doUpgradeAccount = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, {isCompany: true})
        .then(()=>{
            res.redirect("/myProfile")
        })
        .catch(next)
}

module.exports.listCourses = (req, res, next) => {
    Course.find()
    .populate("companyId")
    .then((courses) => {
        res.render ("index", {coursesList: courses})
    })
    .catch(next)
}

module.exports.showCourseDetail = (req, res, next) => {
    const {id} = req.params
    Course.findById(id)
    .populate("subscriptions")
    .then((course)=>{
        const isUserSubscribed = course.subscriptions.some( subscription => subscription.userId.toString() === req.user._id.toString())
    res.render("courseDetail", {...course.toJSON(), isUserSubscribed})
    })
    .catch(next)
}

        
module.exports.updatePassword = (req, res, next) => {
    res.render("updatePassword")
}

module.exports.doUpdatePassword = (req, res, next) => {
    let { password } = req.body;

    let updatedPassword
    if (password.length > 7) {
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        .then((hash) => {
            updatedPassword = hash;
            User.findByIdAndUpdate(req.user.id, {password: updatedPassword})
                .then(() => {
                    res.redirect("/myProfile")
                })
                    .catch(next)
                })
        .catch(e => console.error(e))
    } else {
        res.redirect("/updatePassword")
    }
}

module.exports.doUpdateProfilePic = (req, res, next) => {
    if(req.file){
    User.findByIdAndUpdate(req.user.id, {imageUrl: req.file.path})
        .then(()=>{
            res.redirect("/myProfile")
        })
        .catch(next)
    }
    else{
        res.redirect("/myProfile")
    }
}

module.exports.doUpgradeAccount = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, {isCompany: true})
        .then(()=>{
            res.redirect("/myProfile")
        })
        .catch(next)
}

module.exports.listCourses = (req, res, next) => {
    Course.find()
    .populate("companyId")
    .then((courses) => {
        res.render ("index", {coursesList: courses})
    })
    .catch(next)
}

module.exports.showCourseDetail = (req, res, next) => {
    const {id} = req.params;

    let companyId = false;
    if(req.user) {
         companyId = req.user.id;
    }
    let isCreator

    Course.findById(id)
    .populate("subscriptions")
    .then((course)=>{
        if (course.companyId == companyId) {
            isCreator = true
        }

        let isUserSubscribed

        if(req.user) {
            isUserSubscribed = course.subscriptions.some( subscription => subscription.userId.toString() === req.user._id.toString())
        } else {
            isUserSubscribed = false;
        }
    res.render("courseDetail", {...course.toJSON(), isUserSubscribed, isCreator})
    })
    .catch(next)
}

module.exports.deleteCourse = (req, res, next) => {
    const {id} = req.params;

    Course.findByIdAndDelete(id)
    .populate("subscriptions")
    .then((course) => {
        return Subscription.find({courseId: id})
         .then((subscriptions) => {
            function loop(x) {
                if (x >= subscriptions.length) {
                    res.redirect("/coursesOffer");
                    return;
                } else {
                Subscription.findOneAndDelete({courseId: id})
                .then(() => {
                    loop(x + 1);
                })
                }
            }
            loop(0);
         })
        })
    .catch(next)
}

module.exports.activate = (req, res, next) => {
    User.findOneAndUpdate(
        { activationToken: req.params.token, active: false },
        { active: true }
    )
        .then((u) => {
        if (u) {
            res.render("auth/loginUser", {
            user: { email: u.email },
            message:
                "You have activated your account. Now, you can log in",
            });
        } else {
            res.redirect("/coursesOffer");
        }
        })
        .catch((e) => next(e));
};

module.exports.showCompanyDetail = (req, res, next) => {
    const {id} = req.params
    User.findById(id)
    .then((company)=>{
    res.render("companyDetail", company)
    })
    .catch(next)
}

module.exports.subscribe = (req, res, next) => {
    const {userId, courseId} = req.params;

    Subscription.find({userId, courseId})
    .then((subscriber)=>{
        if(subscriber.length === 0){
            Subscription.create({userId, courseId})
                .then(()=>{
                    res.redirect(`/courseDetail/${courseId}`)
                })   
                .catch(next)
        } else {
            res.redirect(`/courseDetail/${courseId}`)
        }
    })  
}

module.exports.unSubscribe = (req, res, next) => {
    const {userId, courseId} = req.params;

    Subscription.findOneAndDelete({userId, courseId})
        .then((subscriber)=>{
            res.redirect(`/courseDetail/${courseId}`)
            })   
}

module.exports.cantSubscribe = (req, res, next) => {
    const { courseId } = req.params;

    res.redirect(`/courseDetail/${courseId}`)
}

module.exports.publishCourse = (req, res, next) => {
    res.render(`publishCourseForm`)
}

module.exports.doPublishCourse = (req, res, next) => {
    const {title, subject, duration, difficulty, description, address} = req.body;
    const companyId = req.user.id;
    let newCourse = {title, subject, duration, difficulty, description, address, companyId};

    if(req.file){
        newCourse.imageUrl = req.file.path
    }

    Course.create(newCourse)
        .then((course)=>{
            res.redirect("/coursesOffer")
        }).catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
                res.render("publishCourseForm", { user: req.body, errors: e.errors })
            } else {
            next(e)
            }
        })
}

module.exports.doDeleteAccount = (req, res, next) => {
    const userId = req.user.id;

    req.logout()

    User.findByIdAndDelete(userId)
    .then(() => {
        return Subscription.find({userId: userId})
    })
    .then((subscriptions)=>{
        subscriptions.forEach((subscription)=>{
            Subscription.findByIdAndDelete(subscription.id)
        })
    })
    .catch((e)=>{
        next(e)
    })   

    res.redirect("/")
}