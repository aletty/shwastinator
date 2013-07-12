var models = require("../models.js");

exports.home = function(req, res) {
    console.log(req.session.user)
    models.Liquid.find().exec(function (err, liquids){
        res.render('admin', {title: 'Admin Page', liquids:liquids});        
    })
}

exports.liquid = function(req, res) {
    res.render('liquid', {title: 'Add a New Liquid'});
}


exports.addLiquid = function(req, res){
    console.log("adding liquid object");
    console.log(req.body);
    console.log(req.body.name);
    var newliquid = new models.Liquid({name: req.body.name, alcoholic: req.body.alcoholic});
    newliquid.save(function(err){
        if (err) return ("error saving liquid", err);
        console.log('liquid saved');
    });
    res.redirect("/admin");
};

exports.createDrinks = function(req, res) {
    models.Liquid.find().exec(function (err, liquids){
        res.render('createDrinks', {title: 'Create Drinks', liquids:liquids});        
    })
}