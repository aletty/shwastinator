
/*
 * GET users listing.
 */
var models = require("../models.js");
exports.profile = function(req, res){
	models.User.findOne({name:req.param.user}).exec(function(err,user){
		res.render('profile', {title: req.param.user, user: user});
	});
};