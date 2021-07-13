module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isCompany){
        next()
    } else  {
        res.redirect("/auth/registerUser")
    }
}