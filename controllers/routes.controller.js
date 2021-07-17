const User = require("../models/User.model");
const bcrypt = require("bcrypt")
const fileUploader = require('../config/cloudinary.config')

module.exports.showProfile = (req, res, next) => {
    res.render("myProfile")
}


module.exports.editMyProfile = (req, res, next) => {
    res.render("editMyProfile")
}

module.exports.doEditMyProfile = (req, res, next) => {

    if(req.user.isCompany){
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        const { username, email, companyName, description} = req.body;
        const updatedUser = {}
        if (username.length > 2) {
            updatedUser.username = username
        }
        if (validateEmail(email)) {
            updatedUser.email = email
        }
        if(companyName.length > 2) {
            updatedUser.companyName = companyName
        }
        if(description.length > 24) {
            updatedUser.description = description
        }

        User.findByIdAndUpdate(req.user.id, updatedUser)
        .then(() => {
            res.redirect("/myProfile")
        })
        .catch(next)
    }else{
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          }
    
        const { username, email, fullName} = req.body;
        const updatedUser = {}
        if (username.length > 2) {
            updatedUser.username = username
        }
        if (validateEmail(email)) {
            updatedUser.email = email
        }
        if(fullName.length > 2) {
            updatedUser.fullName = fullName
        }
    
        User.findByIdAndUpdate(req.user.id, updatedUser)
        .then(() => {
            res.redirect("/myProfile")
        })
        .catch(next)
    }
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