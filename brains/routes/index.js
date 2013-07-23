
/*
 * GET home page.
 */

var models = require('../models');

exports.index = function(req, res){
  models.User.findOne({name:"Shwasted"}).populate('_orders').exec(function (err, user){
    var sortedOrders = topOrders(user._orders);
    console.log(sortedOrders);
    models.Drink.find().exec(function (err, drinks){
      models.Drink.find({$or: [ {name: sortedOrders[0][0]}, {name: sortedOrders[1][0]}, {name: sortedOrders[2][0]}]}).exec(function (err, topDrinks){
        res.render('index', { title: 'Express', user:req.session.user, drinks:drinks, topDrinks:topDrinks});
      })
    })
  })
};

function topOrders(_orders) {
    //takes name of liquid and pump number
  var hist = {};
  for (var i=0; i<_orders.length; i++){
    if(!hist[_orders[i].name]){
      hist[_orders[i].name]=1;
    }
    else
      hist[_orders[i].name]= hist[_orders[i].name]+1;
  }
  var sortable = [];
  for (var drink in hist)
    sortable.push([drink, hist[drink]])
  sortable.sort(function(a, b) {return b[1] - a[1]})
  return sortable;
}