
/*
 * GET users listing.
 */
var models = require("../models.js");
var bcrypt = require('bcrypt');


exports.profile = function(req, res){
	models.User.findOne({name:req.param.user}).exec(function(err,user){
		res.render('profile', {title: req.param.user, user: user});
	});
};

exports.signin = function(req, res){
    res.render('signin', {title: 'Shwastinator'});
}

exports.signup = function(req, res){
    res.render('signup', {title: 'Shwastinator'});
}

exports.create = function(req, res){
  console.log(req.body);
  console.log("username:", req.body.username);
  console.log("password:", req.body.uncryptpass);
  
  var hashedPassword = bcrypt.hashSync(req.body.uncryptpass, 10);
  var new_user = new models.User({name: req.body.username, password: hashedPassword});
  console.log('FLAG!!!');
  new_user.save(function(err){
    if (err) return console.log("error while saving new user" + req.body.username, err);
      req.session.user = new_user;
      res.send({redirect: '/'}); 
  });
}

exports.login = function(req,res){
  User.find({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    if (user.length == 0){
      res.send({verified: false});
    } else {
      var rightEnteredPassword = user[0].password;
      var success  = bcrypt.compareSync(req.body.uncryptpass, rightEnteredPassword);
      if (success) {
        req.session.user = user[0];
        res.send({redirect: '/'});
      }
    }
  });
}