const Company = require("../models/Company.model");
const mongoose = require("mongoose");

module.exports.register = (req, res, next) => {
    res.render("auth/registerCompany");
}