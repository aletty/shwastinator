
/*
 * GET users listing.
 */
var models = require("../models.js");
var bcrypt = require('bcrypt');


exports.profile = function(req, res){
  console.log(req.session.user.name);
	models.User.find({name:req.session.user.name}).populate('_orders', null, null, { sort: [['order', 'asc']] }).exec(function(err,user){
		console.log(user);
    res.render('profile', {title: user.name, user: user[0]});
	});
};

exports.signin = function(req, res){
    res.render('signin', {title: 'Shwastinator'});
}

exports.signup = function(req, res){
    res.render('signup', {title: 'Shwastinator'});
}

exports.create = function(req, res){
  console.log("username:", req.body.username);
  
  var hashedPassword = bcrypt.hashSync(req.body.uncryptpass, 10);
  var new_user = new models.User({name: req.body.username, password: hashedPassword, approved: false});
  new_user.save(function(err){
    if (err) return console.log("error while saving new user" + req.body.username, err);
      req.session.user = new_user;
      res.send({redirect: '/'}); 
  });
}

exports.login = function(req,res){
  console.log("login");
  models.User.find({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    if (user.length == 0){
      res.send({verified: false});
    } else {
      console.log("user");
      var rightEnteredPassword = user[0].password;
      var success  = bcrypt.compareSync(req.body.uncryptpass, rightEnteredPassword);
      if (success) {
        req.session.user = user[0];
        res.send({redirect: '/'});
      }
    }
  });
}

exports.orderDrink = function(req, res){
  console.log(req.body.drinkOrdered);
  models.Drink.find({name: req.body.drinkOrdered}).exec(function (err, drink){
    models.User.update({name:req.session.user.name}, 
      {$inc: {tab: drink[0].price}, $push: {_orders:drink}}, function (err, numberAffected, raw) {
        if (err) return handleError(err);
        console.log('The number of updated documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
    });
  })
}

