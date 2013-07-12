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
    alcoholic: Boolean 
});

var Liquid = mongoose.model('Liquid', liquidSchema);

exports.User = User;
exports.Drink = Drink;
exports.Liquid = Liquid;