
/*
 * GET home page.
 */

var models = require('../models');

exports.index = function(req, res){
  models.Drink.find().exec(function (err, drinks){
    console.log(drinks[0].image);
    res.render('index', { title: 'Express', user:req.session.user, drinks:drinks});
  })
};