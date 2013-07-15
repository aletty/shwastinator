var models = require("../models.js");
var async = require("async");

exports.home = function(req, res) {
    console.log(req.session.user)
    models.Liquid.find().exec(function (err, liquids){
        res.render('admin', {title: 'Admin Page', 
            user: req.session.user, 
            liquids:liquids});        
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

function updatePump(liquidName, pumpNumber) {
    //takes name of liquid and pump number
    models.Liquid.update({name: liquidName}, {$set: {pump: pumpNumber}}).exec();
}

exports.saveSetup = function(req, res){
    console.log('saving setup');
    models.Liquid.update({},{pump: 0},{multi: true}, function(err, numAffected, raw){
        if (err){
            console.log(err);
            return false;
        }
        updatePump(req.body.pump1, 1);
        updatePump(req.body.pump2, 2);
        updatePump(req.body.pump3, 3);
        updatePump(req.body.pump4, 4);
        updatePump(req.body.pump5, 5);
        updatePump(req.body.pump6, 6);
        updatePump(req.body.pump7, 7);
        updatePump(req.body.pump8, 8);
        updatePump(req.body.pump9, 9);
        updatePump(req.body.pump10, 10);
        updatePump(req.body.pump11, 11);
        updatePump(req.body.pump12, 12);
        updatePump(req.body.pump13, 13);
    });
}

exports.approveUsers = function(req, res){
    models.User.find({approved:false}).exec(function (err, users){
        res.render('ApproveUsers', {title: 'Approve Users', user: req.session.user, users:users});        
    })
}

exports.approved = function(req,res) {
    console.log(req.body);
    models.User.update({name:req.body.userToApp}, {approved:true}).exec(function (err, user){
        console.log(user);
    })
}