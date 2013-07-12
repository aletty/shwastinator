var models = require("../models.js");
var bcrypt = require('bcrypt');

exports.createUsers = function(req, res){
    // this is to populate the database for development
    var hashedk = bcrypt.hashSync("keely", 10);
    var hasheda = bcrypt.hashSync("arjun", 10);
    var hashedn = bcrypt.hashSync("notad", 10);
    var hashedu = bcrypt.hashSync("unapp", 10);

    var keely = new models.User({name: "Keely", password: hashedk, approved: true, tab: 0, admin: true});
    var arjun = new models.User({name: "Arjun", password: hasheda, approved: true, tab: 0, admin: true});
    var notad = new models.User({name: "Notad", password: hashedn, approved: true, tab: 0, admin: false});
    var unapp = new models.User({name: "Unapp", password: hashedu, approved: false, tab: 0, admin: false});
    keely.save(function(err){
        if (err) return ("error saving Keely", err);
        console.log('Keely saved');
    });
    arjun.save(function(err){
        if (err) return ("error saving Arjun", err);
        console.log('Arjun saved');
    });
    notad.save(function(err){
        if (err) return ("error saving Notad", err);
        console.log('Notad saved');
    });
    unapp.save(function(err){
        if (err) return ("error saving Unapp", err);
        console.log('Unapp saved');
    });
    res.send("Users created");
}

exports.drinks = function(req, res){
    var rum = new models.Liquid({name: "Rum", alcoholic: true});
    rum.save(function(err){
        if (err) return ("error saving Rum", err);
        console.log('Rum saved');
    });
    var coke = new models.Liquid({name: "Coke", alcoholic: false});
    coke.save(function(err){
        if (err) return ("error saving Coke", err);
        console.log('Coke saved');
    });
    var vodka = new models.Liquid({name: "Vodka", alcoholic: true});
    vodka.save(function(err){
        if (err) return ("error saving Vodka", err);
        console.log('Vodka saved');
    });
    var oj = new models.Liquid({name: "Orange Juice", alcoholic: true});
    oj.save(function(err){
        if (err) return ("error saving Orange Juice", err);
        console.log('Orange Juice saved');
    });
    var randc = new models.Drink({_liquids: [rum, coke], name: "Rum and Coke", cost: 1.5, price: 3});
    randc.save(function(err){
        if (err) return ("error saving Rum and Coke", err);
        console.log('Rum and Coke saved');
    });
    var voj = new models.Drink({_liquids: [vodka, oj], name: "Vodka Orange Juice", cost: 2, price: 3});
    voj.save(function(err){
        if (err) return ("error saving Vodka Orange Juice", err);
        console.log('Vodka Orange Juice saved');
    });

    res.send("Liquids and drinks populated");
}