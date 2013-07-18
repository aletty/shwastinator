var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    approved: Boolean,
    _orders: [{ type: Schema.Types.ObjectId, ref: 'Drink', time: Date.now }],
    tab: Number,
    image: String,
    guest: [{type: Schema.Types.ObjectId, ref: 'User'}],
    admin: Boolean
});

var User = mongoose.model('User', userSchema);

var drinkSchema = new Schema({
    _liquids: [{_liquid:{ type: Schema.Types.ObjectId, ref: 'Liquid' }, units: Number}],
    name: String,
    cost: Number,
    price: Number,
    image: String
});

var Drink = mongoose.model('Drink', drinkSchema);

var liquidSchema = new Schema({
    name: String,
    alcoholic: Boolean,
    pump: {type: Number, default: 0} 
});

var Liquid = mongoose.model('Liquid', liquidSchema);

var orderschema = new Schema({
    orders: [{ type: Schema.Types.ObjectId, ref: 'Drink', time: Date.now }]
});

var Orders = mongoose.model('Orders', orderschema);

exports.Orders = Orders;
exports.User = User;
exports.Drink = Drink;
exports.Liquid = Liquid;