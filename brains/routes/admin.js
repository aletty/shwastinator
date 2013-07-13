var models = require("../models.js");
var async = require("async");

exports.home = function(req, res) {
    console.log(req.session.user)
    models.Liquid.find().exec(function (err, liquids){
        models.Shwastinator.find().exec(function (err, Shwastinator){
            res.render('admin', {title: 'Admin Page', 
                user: req.session.user, 
                Shwastinator: Shwastinator, 
                liquids:liquids});        
        })
    })
}

exports.liquid = function(req, res) {
    res.render('liquid', {title: 'Add a New Liquid', user: req.session.user});
}


exports.addLiquid = function(req, res){
    console.log("adding liquid object");
    var newliquid = new models.Liquid({name: req.body.name, user: req.session.user, alcoholic: req.body.alcoholic});
    newliquid.save(function(err){
        if (err) return ("error saving liquid", err);
        console.log('liquid saved');
    });
    res.redirect("/admin");
};

exports.createDrinks = function(req, res) {
    models.Liquid.find().exec(function (err, liquids){
        res.render('createDrinks', {title: 'Create Drinks', user: req.session.user, liquids:liquids});        
    })
}

function queryLiquid(query) {
    //takes in name of liquid as string
    models.Liquid.find({name: query}).exec(function (err, pumpObj){
        console.log(pumpObj);
        return pumpObj[0];
    });
}

exports.saveSetup = function(req, res){
    var shwaste = new models.Shwastinator({
    pump1: req.body.pump1,
    pump2: req.body.pump2,
    pump3: req.body.pump3,
    pump4: req.body.pump4,
    pump5: req.body.pump5,
    pump6: req.body.pump6,
    pump7: req.body.pump7,
    pump8: req.body.pump8,
    pump9: req.body.pump9,
    pump10: req.body.pump10,
    pump11: req.body.pump11,
    pump12: req.body.pump12,
    pump13: req.body.pump13,
    });
    shwaste.save(function(err){
        if (err) return ("error saving Shwastinator", err);
        console.log('Shwastinator saved');
    })
}
exports.approveUsers = function(req, res){
    models.User.find({approved:false}).exec(function (err, users){
        res.render('ApproveUsers', {title: 'Approve Users', user: req.session.user, users:users});        
    })
}